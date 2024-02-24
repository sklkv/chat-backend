import { Body, Controller, Post, HttpCode } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SignUpResponse, SignInResponse } from "@swagger/auth";
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
  signin(@Body() singInDto: SignInDto) {
    return this.authService.signInUser(singInDto);
  }
}
