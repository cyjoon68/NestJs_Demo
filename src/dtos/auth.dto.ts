import { IsNotEmpty, IsNumber, IsString, IsUUID } from "@nestjs/class-validator";

export class SignupAuthDTO {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    userName: string;

    @IsNotEmpty()
    @IsNumber()
    yearBirth: number;

    @IsNotEmpty()
    @IsString()
    gender: string;

    @IsNotEmpty()
    @IsString()
    region: string;

    @IsNotEmpty()
    @IsString()
    education: string;

    @IsNotEmpty()
    @IsString()
    religion: string;

    @IsNotEmpty()
    @IsNumber()
    height: number;

    @IsNotEmpty()
    @IsNumber()
    weight: number;

    @IsNotEmpty()
    @IsString()
    profileImageOne: string;

    @IsNotEmpty()
    @IsString()
    profileImageTwo: string;

    @IsNotEmpty()
    @IsString()
    profileImageThree: string;

    @IsNotEmpty()
    @IsString()
    userDesc: string;

    @IsNotEmpty()
    @IsString()
    tags: string;

    @IsNotEmpty()
    @IsString()
    mbti: string;

    @IsNotEmpty()
    @IsString()
    smoking: string;

    @IsNotEmpty()
    @IsString()
    drinking: string;

    @IsNotEmpty()
    @IsString()
    memType: string;
};

export class SignupAuthRepoDTO extends SignupAuthDTO {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    @IsUUID()
    profileId: string;
};

export class SigninAuthDTO {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
};

export class SignoutAuthDTO {
    @IsNotEmpty()
    @IsString()
    email: string;
};

export class SignedAuthDTO {
    @IsNotEmpty()
    @IsString()
    email: string;
};