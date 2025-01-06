import { SignedAuthDTO } from "./../dtos/auth.dto";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { SigninAuthDTO, SignupAuthDTO, SignupAuthRepoDTO } from "src/dtos/auth.dto";
import { AuthRepository } from "src/repositorys/auth.repository";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserEntity } from "src/entitys/user/user.entity";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly userService: UserService,
    ) { }

    async signup(signupAuthDto: SignupAuthDTO) {
        try {
            const hashedPassword = await bcrypt.hash(signupAuthDto.password, 10);

            const userId = uuidv4();
            const profileId = uuidv4();

            const signupAuthRepoDto: SignupAuthRepoDTO = {
                ...signupAuthDto,
                userId: userId,
                profileId: profileId,
                password: hashedPassword,
            };

            const user = await this.authRepository.signup(signupAuthRepoDto);

            const accessToken = await this.createAccessToken(user);
            const refreshToken = await this.createRefreshToken(user);

            await this.setUserCurrentRefreshToken(user.userId, refreshToken);

            return {
                accessToken,
                refreshToken
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async signin(signinAuthDto: SigninAuthDTO) {
        try {
            const user = await this.authRepository.signin(signinAuthDto);
            const isPasswordValid = await bcrypt.compare(signinAuthDto.password, user.password);

            if(isPasswordValid) {
                const accessToken = await this.createAccessToken(user);
                const refreshToken = await this.createRefreshToken(user);                
                
                await this.setUserCurrentRefreshToken(user.userId, refreshToken);

                return {
                    accessToken,
                    refreshToken
                };
            }

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async signed(signedAuthDto: SignedAuthDTO) {
        return this.authRepository.signed(signedAuthDto);
    }

    async createAccessToken(user: UserEntity): Promise<string> {
        const payload = {
            userId: user.userId,
        };

        const accessToken = await this.jwtService.signAsync(
            payload,
            {
                secret: this.configService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
                expiresIn: this.configService.get<string>("JWT_ACCESS_TOKEN_EXP")
            }
        );

        return accessToken;
    }

    async createRefreshToken(user: UserEntity): Promise<string> {
        const payload = {
            userId: user.userId
        };

        const refreshToken = await this.jwtService.signAsync(
            payload,
            {
                secret: this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
                expiresIn: this.configService.get<string>("JWT_REFRESH_TOKEN_EXP")
            }
        );

        return refreshToken;
    }

    async setUserCurrentRefreshToken(userId: string, refreshToken: string): Promise<void> {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

        const exp = parseInt(this.configService.get<string>("JWT_REFRESH_TOKEN_DATE"));

        const refreshTokenExp = new Date();
        refreshTokenExp.setDate(refreshTokenExp.getDate() + exp);
        
        await this.userService.updateUser({ userId: userId, refreshToken: hashedRefreshToken, refreshTokenExp: refreshTokenExp });
    };

    async compareUserRefreshToken(userId: string, refreshToken: string): Promise<boolean> {
        const user = await this.userService.findUser({ userId: userId });

        if (!user.currentRefreshToken) return false;

        const result = await bcrypt.compare(refreshToken, user.currentRefreshToken);
        if (!result) return false;

        return true;
    }

    async refresh(userId: string, refreshToken: string): Promise<any> {
        const result = await this.compareUserRefreshToken(userId, refreshToken);
        if (!result) {
            throw new UnauthorizedException("로그인 필요합니다.");
        }

        const user = await this.userService.findUser({ userId });
        const accessToken = await this.createAccessToken(user);

        return {
            accessToken,
            refreshToken
        }
    }
}