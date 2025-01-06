import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostController } from "src/controllers/post.controller";
import { PostEntity } from "src/entitys/post.entity";
import { PostRepository } from "src/repositorys/post.repository";
import { PostService } from "src/services/post.service";

@Module({
    imports: [TypeOrmModule.forFeature([PostEntity])],
    controllers: [PostController],
    providers: [PostService, PostRepository],
})
export class PostModule {};