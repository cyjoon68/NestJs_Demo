import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAccessTokenGuard extends AuthGuard("access_token") {
    // private readonly logger = new Logger(JwtAccessTokenGuard.name);

    // handleRequest(err, user, info) {
    //     if (err || !user) {
    //         this.logger.error(`인증 실패: ${info.message}`);
    //         this.logger.error(err);
    //         this.logger.error(user);

    //         throw err || new UnauthorizedException();
    //     }
    //     return user;
    // }
}