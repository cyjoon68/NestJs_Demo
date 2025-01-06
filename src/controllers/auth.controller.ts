import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { SignedAuthDTO, SigninAuthDTO, SignupAuthDTO } from "src/dtos/auth.dto";
import { JwtRefreshTokenGuard } from "src/guards/refreshToken.guard";
import { AuthService } from "src/services/auth.service";

@Controller("api/auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post("signup")
    async signup(@Body() signupAuthDto: SignupAuthDTO, @Res({ passthrough: true }) res: Response) {
        const user = await this.authService.signup(signupAuthDto);

        if(!user) {
            throw new Error("회원가입 오류입니다.");
        }

        res.setHeader("Authorization", "Bearer " + Object.values(user));
        res.cookie("access_token", user.accessToken, { httpOnly: true });
        res.cookie("refresh_token", user.refreshToken, { httpOnly: true });
    }

    @Post("signin")
    async signin(@Body() signinAuthDto: SigninAuthDTO, @Res({ passthrough: true }) res: Response) {
        try {
            const user = await this.authService.signin(signinAuthDto);

            if(!user) {
                throw new Error("회원가입 오류입니다.");
            }

            res.setHeader("Authorization", "Bearer " + Object.values(user));
            res.cookie("access_token", user.accessToken, { httpOnly: true });
            res.cookie("refresh_token", user.refreshToken, { httpOnly: true });            
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    @Get("signed")
    async signed(@Query("email") email: string) {
        const signedAuthDto = new SignedAuthDTO();
        signedAuthDto.email = email;

        const isSigned = await this.authService.signed(signedAuthDto);

        return { isSigned: !!isSigned };
    }

    @UseGuards(JwtRefreshTokenGuard)
    @Post("refresh")
    async refresh(@Req() req: any, @Res({ passthrough: true }) res: Response) {
        const userId: string = req.user.userId;
        const refreshToken = req.cookies.refresh_token;

        const tokenData = await this.authService.refresh(userId, refreshToken);

        res.setHeader("Authorization", "Bearer " + tokenData.accessToken);
        res.cookie("access_token", tokenData.accessToken, { httpOnly: true });

        return tokenData;
    }
};