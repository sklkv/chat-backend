import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import { UsersService } from "./users.service";

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
}
