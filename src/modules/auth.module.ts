import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthRepository } from "src/repositorys/auth.repository";
import { AuthService } from "src/services/auth.service";
import { UserEntity } from "src/entitys/user/user.entity";
import { UserInfoEntity } from "src/entitys/user/info.entity";
import { UserProfileEntity } from "src/entitys/user/profile.entity";
import { UserMemEntity } from "src/entitys/user/mem.entity";
import { UserService } from "src/services/user.service";
import { UserRepository } from "src/repositorys/user.repository";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "src/controllers/auth.controller";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ".env",
        }),
        JwtModule.register({ 
            global: true 
        }),
        TypeOrmModule.forFeature([UserEntity, UserInfoEntity, UserProfileEntity, UserMemEntity]),
    ],
    controllers: [AuthController],
    providers: [
        AuthService, 
        UserService, 
        AuthRepository, 
        UserRepository,
    ],
})
export class AuthModule { };