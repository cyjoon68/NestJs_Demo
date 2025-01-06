import { IsDate, IsNotEmpty, IsNumber, IsString, IsUUID } from "@nestjs/class-validator";

export class FindUserDTO {
    @IsNotEmpty()
    @IsUUID()
    userId?: string;
}

export class UpdateUserDTO {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsString()
    email?: string;

    @IsString()
    password?: string;

    @IsString()
    refreshToken?: string;

    @IsDate()
    refreshTokenExp?: Date;
};

export class UpdateUserInfoDTO {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsString()
    userName?: string;

    @IsString()
    region?: string;

    @IsString()
    education?: string;

    @IsString()
    religion?: string;

    @IsNumber()
    height?: number;

    @IsNumber()
    weight?: number;
}

export class UpdateUserProfileDTO {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsString()
    profileImageOne?: string;

    @IsString()
    profileImageTwo?: string;

    @IsString()
    profileImageThree?: string;

    @IsString()
    userDesc?: string;
    
    @IsString()
    tags?: string;

    @IsString()
    mbti?: string;

    @IsString()
    smoking?: string;

    @IsString()
    drinking?: string;
}

export class UpdateUserMemDTO {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsString()
    memType?: string;

    @IsDate()
    memStartDate?: Date;

    @IsDate()
    memEndDate?: Date;
}