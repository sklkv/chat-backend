import {
  Body,
  Controller,
  Post,
  Get,
  HttpCode,
  UseGuards,
  Request,
  Response,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SignUpResponse, SignInResponse } from "@swagger/auth";
import { JwtAuthGuard } from "@strategy/jwt/jwt.guard";
import { JwtRefreshGuard } from "@strategy/refresh-jwt/refresh-jwt.guard";
import { User } from "@modules/users/users.model";
import { AuthService } from "./auth.service";
import { SignUpDto, SignInDto } from "./dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: "Регистрация пользователя" })
  @ApiResponse({ status: 200, type: SignUpResponse })
  @Post("signup")
  @HttpCode(200)
  signup(@Body() signUpDto: SignUpDto) {
    return this.authService.singUpUser(signUpDto);
  }

  @ApiOperation({ summary: "Авторизация пользователя" })
  @ApiResponse({ status: 200, type: SignInResponse })
  @Post("signin")
  @HttpCode(200)
  async signin(@Body() singInDto: SignInDto, @Response({ passthrough: true }) res) {
    const result = await this.authService.signInUser(singInDto);
    const { refresh_token, ...response } = result;
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      sameSite: "strict",
    });
    return response;
  }

  @UseGuards(JwtRefreshGuard)
  @ApiOperation({ summary: "Обновление access токена" })
  @Post("refresh")
  @HttpCode(200)
  refresh(@Request() req) {
    return this.authService.refreshAccessToken(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Получение информации о текущем пользователе" })
  @ApiResponse({ status: 200, type: [User] })
  @Get("profile")
  getUser(@Request() req) {
    return this.authService.getUserProfile(req.user);
  }
}
