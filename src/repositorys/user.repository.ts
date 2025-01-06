import { UpdateUserInfoDTO, UpdateUserProfileDTO } from './../dtos/user.dto';
import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/entitys/user/user.entity";
import { UserInfoEntity } from "src/entitys/user/info.entity";
import { UserProfileEntity } from "src/entitys/user/profile.entity";
import { UserMemEntity } from "src/entitys/user/mem.entity";
import { DeleteResult, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { FindUserDTO, UpdateUserDTO } from "src/dtos/user.dto";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,

        @InjectRepository(UserInfoEntity)
        private userInfoRepository: Repository<UserInfoEntity>,

        @InjectRepository(UserProfileEntity)
        private userProfileRepository: Repository<UserProfileEntity>,

        @InjectRepository(UserMemEntity)
        private userMemRepository: Repository<UserMemEntity>
    ) { }

    async findUser(findUserDto: FindUserDTO): Promise<UserEntity> {
        return await this.userRepository.findOne({ where: { userId: findUserDto.userId } });
    }
    async findUserInfo(findUserDto: FindUserDTO): Promise<UserInfoEntity> {
        return await this.userInfoRepository.findOne({ where: { userId: findUserDto.userId } });
    }
    async findUserProfile(findUserDto: FindUserDTO): Promise<UserProfileEntity> {
        return await this.userProfileRepository.findOne({ where: { userId: findUserDto.userId } });
    }
    async findUserMem(findUserDto: FindUserDTO): Promise<UserMemEntity> {
        return await this.userMemRepository.findOne({ where: { userId: findUserDto.userId } });
    }
    async findUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }
    async updateUser(updateUserDto: UpdateUserDTO): Promise<UserEntity> {
        const findUser = await this.findUser({ userId: updateUserDto.userId });

        if (!findUser) {
            throw new Error("유저 아이디가 잘못되었습니다.");
        }

        if (updateUserDto.email) {
            findUser.email = updateUserDto.email;
        };
        if (updateUserDto.password) {
            findUser.password = updateUserDto.password;
        };
        if (updateUserDto.refreshToken) {
            findUser.currentRefreshToken = updateUserDto.refreshToken;
        };
        if (updateUserDto.refreshTokenExp) {
            findUser.currentRefreshTokenExp = updateUserDto.refreshTokenExp;
        };

        return await this.userRepository.save(findUser);
    }

    async updateUserInfo(updateUserInfoDto: UpdateUserInfoDTO) {
        const findUser = await this.findUserInfo({ userId: updateUserInfoDto.userId });

        if (!findUser) {
            throw new Error("유저 아이디가 잘못되었습니다.");
        }

        if (findUser.userName) {
            findUser.userName = updateUserInfoDto.userName;
        }
        if (findUser.region) {
            findUser.region = updateUserInfoDto.region;
        }
        if (findUser.education) {
            findUser.education = updateUserInfoDto.education;
        }
        if (findUser.religion) {
            findUser.religion = updateUserInfoDto.religion;
        }
        if (findUser.height) {
            findUser.height = updateUserInfoDto.height;
        }
        if (findUser.weight) {
            findUser.weight = updateUserInfoDto.weight;
        }

        return await this.userInfoRepository.save(findUser);
    }

    async updateUserProfile(updateUserProfileDto: UpdateUserProfileDTO) {
        const findUser = await this.findUserProfile({ userId: updateUserProfileDto.userId });

        if (!findUser) {
            throw new Error("유저 아이디가 잘못되었습니다.");
        }

        if (findUser.profileImageOne) {
            findUser.profileImageOne = updateUserProfileDto.profileImageOne;
        }
        if (findUser.profileImageTwo) {
            findUser.profileImageTwo = updateUserProfileDto.profileImageTwo;
        }
        if (findUser.profileImageThree) {
            findUser.profileImageThree = updateUserProfileDto.profileImageThree;
        }
        if (findUser.userDesc) {
            findUser.userDesc = updateUserProfileDto.userDesc;
        }
        if (findUser.tags) {
            findUser.tags = updateUserProfileDto.tags;
        }
        if (findUser.mbti) {
            findUser.mbti = updateUserProfileDto.mbti;
        }
        if (findUser.smoking) {
            findUser.smoking = updateUserProfileDto.smoking;
        }
        if (findUser.drinking) {
            findUser.drinking = updateUserProfileDto.drinking;
        }

        return await this.userProfileRepository.save(findUser);
    }

    

    async deleteUser(findUserDto: FindUserDTO): Promise<DeleteResult> {
        return await this.userRepository.delete({ userId: findUserDto.userId });
    }
}