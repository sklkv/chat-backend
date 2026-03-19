import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@strategy/jwt/jwt.guard";
import { User } from "./users.model";
import { UsersService } from "./users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Получение всех пользователей" })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  get() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Поиск пользователей по имени или email" })
  @ApiQuery({ name: "query", required: true })
  @ApiResponse({ status: 200, type: [User] })
  @Get("search")
  search(@Query("query") query: string) {
    return this.userService.searchUsers(query);
  }
}
