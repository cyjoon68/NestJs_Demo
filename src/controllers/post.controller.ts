import { Response } from "express";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreatePostDTO, FindPostDTO } from "src/dtos/post.dto";
import { PostEntity } from "src/entitys/post.entity";
import { PostService } from "src/services/post.service";

@Controller("api")
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post("post")
    create(@Body() createPostDto: CreatePostDTO, res: Response): Promise<PostEntity> {
        return this.postService.create(createPostDto);

    }

    @Get("post/:postId")
    async find(findPostDto: FindPostDTO): Promise<PostEntity> {
        return this.postService.find(findPostDto);
    }

    @Get("posts")
    findAll(): Promise<PostEntity[]> {
        return this.postService.findAll();
    }
}