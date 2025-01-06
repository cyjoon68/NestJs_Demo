import { Injectable } from "@nestjs/common";
import { CreatePostDTO, FindPostDTO } from "src/dtos/post.dto";
import { PostEntity } from "src/entitys/post.entity";
import { PostRepository } from "src/repositorys/post.repository";

@Injectable()
export class PostService {
    constructor(private postRepository: PostRepository) {}

    create(createPostDto: CreatePostDTO): Promise<PostEntity> {
        return this.postRepository.save(createPostDto);
    }

    find(findPostDto: FindPostDTO): Promise<PostEntity> {
        return this.postRepository.findOne({ where: { postId: findPostDto.postId }});
    }

    findAll(): Promise<PostEntity[]> {
        return this.postRepository.find();
    }
}