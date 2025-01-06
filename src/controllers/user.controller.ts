import { UserService } from "src/services/user.service";
import { Controller, Delete, Get, Post, Put, Query, Req, Res, Session, UseGuards } from "@nestjs/common";
import { FindUserDTO, UpdateUserDTO, UpdateUserInfoDTO, UpdateUserProfileDTO } from "src/dtos/user.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtAccessTokenGuard } from "src/guards/accessToken.guard";
import { UserEntity } from "src/entitys/user/user.entity";

@Controller("api")
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    @UseGuards(JwtAccessTokenGuard)
    @Get("user")
    async findUser(@Req() req: any) {
        const userId = req.user.userId;

        if (userId) {
            const findUserDto = new FindUserDTO();
            findUserDto.userId = userId;

            const user = await this.userService.findUser(findUserDto);

            const userInfo = await this.userService.findUserInfo(findUserDto);
            const userProfile = await this.userService.findUserProfile(findUserDto);
            const userMem = await this.userService.findUserMem(findUserDto);

            delete user.userId;
            delete userInfo.userId;
            delete userProfile.userId;

            return { ...user, ...userInfo, ...userProfile };
        } else {
            return null;
        }
    }

    @UseGuards(JwtAccessTokenGuard)
    @Put("user")
    async updateUser(@Req() req: any) {
        const userId = req.user.userId;

        if (userId) {
            const updateUserDto = new UpdateUserDTO();
            updateUserDto.userId = userId;

            await this.userService.updateUser(updateUserDto);
        }
    }

    @UseGuards(JwtAccessTokenGuard)
    @Put("user/info")
    async updateUserInfo(@Req() req: any) {
        const userId = req.user.userId;

        if (userId) {
            const updateUserInfoDto = new UpdateUserInfoDTO();
            updateUserInfoDto.userId = userId;
            await this.userService.updateUserInfo(updateUserInfoDto);
        }
    }

    @UseGuards(JwtAccessTokenGuard)
    @Put("user/profile")
    async updateUserProfile(@Req() req: any) {
        const userId = req.user.userId;

        if (userId) {
            const updateUserProfileDto = new UpdateUserProfileDTO();
            updateUserProfileDto.userId = userId;
            await this.userService.updateUserProfile(updateUserProfileDto);
        }
    }

    @Get("users")
    async findUsers(): Promise<UserEntity[]> {
        return this.userService.findUsers();
    }
}