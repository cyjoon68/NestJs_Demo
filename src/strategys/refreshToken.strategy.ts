import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "src/services/auth.service";

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, "refresh_token") {

    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => { 
                    return request?.cookies?.refresh_token;

                }]),
            secretOrKey: configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
            ignoreExpiration: false,
            passReqToCallback: true
        });
    }

    async validate(req: Request, payload: any) {
        const refreshToken = req?.cookies?.refresh_token;

        if (!refreshToken) {
            throw new UnauthorizedException("refresh token is undefined");
        }

        const result = await this.authService.compareUserRefreshToken(
            payload.userId,
            refreshToken
        );

        if (!result) {
            throw new UnauthorizedException("refresh token is wrong");
        }
        req.user = payload;

        return payload;
    }
}