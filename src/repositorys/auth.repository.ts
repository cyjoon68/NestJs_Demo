import { SignedAuthDTO } from "./../dtos/auth.dto";
import { Injectable } from "@nestjs/common";
import { SigninAuthDTO, SignupAuthRepoDTO } from "src/dtos/auth.dto";
import { UserEntity } from "src/entitys/user/user.entity";
import { Repository } from "typeorm";
import { UserInfoEntity } from "src/entitys/user/info.entity";
import { UserProfileEntity } from "src/entitys/user/profile.entity";
import { UserMemEntity } from "src/entitys/user/mem.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AuthRepository {
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

    async signup(signupAuthRepoDto: SignupAuthRepoDTO) {
        try {
            const {
                userId,
                email,
                password,
                userName,
                yearBirth,
                gender,
                region,
                education,
                religion,
                height,
                weight,
                profileId,
                profileImageOne,
                profileImageTwo,
                profileImageThree,
                userDesc,
                tags,
                mbti,
                smoking,
                drinking,
                memType,
            } = signupAuthRepoDto;


            const user = this.userRepository.create({
                userId,
                email,
                password,
            });

            const saveUser = await this.userRepository.save(user);

            const userInfo = this.userInfoRepository.create({
                userId,
                userName,
                yearBirth,
                gender,
                region,
                education,
                religion,
                height,
                weight,
            });

            await this.userInfoRepository.save(userInfo);

            const userProfile = this.userProfileRepository.create({
                userId,
                profileId,
                profileImageOne,
                profileImageTwo,
                profileImageThree,
                userDesc,
                tags,
                mbti,
                smoking,
                drinking,
            });

            await this.userProfileRepository.save(userProfile);

            // const userMem = this.userMemRepository.create({
            //     userId,
            //     memType,
            // });

            // await this.userMemRepository.save(userMem);

            return saveUser;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async signin(signinAuthDto: SigninAuthDTO) {
        try {
            const { email } = signinAuthDto;
            
            return await this.userRepository.findOne({ where: { email } });
        } catch(error) {
            console.error(error);
            throw error;
        }
    }

    async signed(signedAuthDto: SignedAuthDTO) {
        try {
            const user = await this.userRepository.findOne({ where: { email: signedAuthDto.email } });
            
            return user;
        } catch(error) {
            console.error(error);
            throw error;
        }
    }
}