import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@strategy/jwt/jwt.guard";
import { User } from "./users.model";
import { UsersService } from "./users.service";

// TODO: передать корректный тип пользователя в type
@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: "Получение всех пользователей" })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  get() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Получение информации о текущем пользователе" })
  @ApiResponse({ status: 200, type: [User] })
  @Get("/profile")
  getUser(@Request() req) {
    return req.user;
  }
}
