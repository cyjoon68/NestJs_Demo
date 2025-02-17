import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, "access_token") {
    constructor(
        private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request.cookies.access_token;
                }
            ]),

            secretOrKey: configService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
            ignoreExpiration: false,
            passReqToCallback: true
        });
    }

    validate(req: Request, payload: any) {
        req.user = payload;
        return payload;
    }
}