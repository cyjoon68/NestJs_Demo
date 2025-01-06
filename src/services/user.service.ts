import { Injectable } from "@nestjs/common";
import { FindUserDTO, UpdateUserDTO } from "src/dtos/user.dto";
import { UserInfoEntity } from "src/entitys/user/info.entity";
import { UserMemEntity } from "src/entitys/user/mem.entity";
import { UserProfileEntity } from "src/entitys/user/profile.entity";
import { UserEntity } from "src/entitys/user/user.entity";
import { UserRepository } from "src/repositorys/user.repository";

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository
    ) { }

    async findUser(findUserDto: FindUserDTO): Promise<UserEntity> {
        return this.userRepository.findUser(findUserDto);
    }
    async findUserInfo(findUserDto: FindUserDTO): Promise<UserInfoEntity> {
        return this.userRepository.findUserInfo(findUserDto);
    }
    async findUserProfile(findUserDto: FindUserDTO): Promise<UserProfileEntity> {
        return this.userRepository.findUserProfile(findUserDto);
    }
    async findUserMem(findUserDto: FindUserDTO): Promise<UserMemEntity> {
        return this.userRepository.findUserMem(findUserDto);
    }
    async findUsers(): Promise<UserEntity[]> {
        return this.userRepository.findUsers();
    }
    async updateUser(updateUserDto: UpdateUserDTO): Promise<UserEntity> {
        return await this.userRepository.updateUser(updateUserDto);
    }
    async updateUserInfo(updateUserDto: UpdateUserDTO): Promise<UserInfoEntity> {
        return await this.userRepository.updateUserInfo(updateUserDto);
    }
    async updateUserProfile(updateUserDto: UpdateUserDTO): Promise<UserProfileEntity> {
        return await this.userRepository.updateUserProfile(updateUserDto);
    }
    
    async deleteUser(findUserDto: FindUserDTO): Promise<void> {
        await this.userRepository.deleteUser(findUserDto);
    };
}