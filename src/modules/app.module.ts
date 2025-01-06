import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { PostModule } from "./post.module";
import { AuthModule } from "./auth.module";
import { UserEntity } from "src/entitys/user/user.entity";
import { UserInfoEntity } from "src/entitys/user/info.entity";
import { UserProfileEntity } from "src/entitys/user/profile.entity";
import { UserMemEntity } from "src/entitys/user/mem.entity";
import { PostEntity } from "src/entitys/post.entity";
import { UserModule } from "./user.module";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ".env",
        }),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.POSTGRES_HOST,
            port: +process.env.POSTGRES_PORT,
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            entities: [PostEntity, UserEntity, UserInfoEntity, UserProfileEntity, UserMemEntity],
            synchronize: true,
        }),
        PostModule,
        AuthModule,
        UserModule,
    ],
})

export class AppModule {};