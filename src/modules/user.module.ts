import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/entitys/user/user.entity";
import { UserInfoEntity } from "src/entitys/user/info.entity";
import { UserProfileEntity } from "src/entitys/user/profile.entity";
import { UserMemEntity } from "src/entitys/user/mem.entity";
import { UserService } from "src/services/user.service";
import { UserRepository } from "src/repositorys/user.repository";
import { UserController } from "src/controllers/user.controller";
import { JwtAccessTokenGuard } from "src/guards/accessToken.guard";
import { JwtRefreshTokenGuard } from "src/guards/refreshToken.guard";
import { JwtAccessTokenStrategy } from "src/strategys/accessToken.strategy";
import { JwtRefreshTokenStrategy } from "src/strategys/refreshToken.strategy";
import { AuthModule } from "./auth.module";
import { AuthService } from "src/services/auth.service";
import { AuthRepository } from "src/repositorys/auth.repository";
import { AuthController } from "src/controllers/auth.controller";

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([UserEntity, UserInfoEntity, UserProfileEntity, UserMemEntity])
    ],
    controllers: [UserController, AuthController],
    providers: [
        UserService, 
        AuthService,
        UserRepository,
        AuthRepository,
        JwtAccessTokenGuard,
        JwtRefreshTokenGuard,
        JwtAccessTokenStrategy,
        JwtRefreshTokenStrategy
    ],
})
export class UserModule {};