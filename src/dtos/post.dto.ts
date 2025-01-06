import { IsUUID, IsNotEmpty, IsString } from "@nestjs/class-validator";

export class CreatePostDTO {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @IsString()
    text: string;
}

export class FindPostDTO {
    @IsNotEmpty()
    @IsUUID()
    postId: string;
}