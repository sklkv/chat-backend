import {
  Controller,
  Get,
  Request,
  HttpCode,
  Post,
  Body,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@strategy/jwt/jwt.guard";
import { IJwtPayload } from "@constants/index";
import { Chats } from "./chats.model";
import { ChatsService } from "./chats.service";
import { CreateChatDto } from "./dto";

@ApiTags("chats")
@Controller("chats")
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Получение списка чатов пользователя" })
  @ApiResponse({ status: 200, type: [Chats] })
  @Get("all")
  @HttpCode(200)
  getUserChats(@Request() req: { user: IJwtPayload }) {
    return this.chatsService.findUserChats(req.user);
  }

  @ApiOperation({ summary: "Создание чата" })
  @ApiResponse({ status: 200, type: Chats })
  @Post("create")
  createChat(@Body() dto: CreateChatDto) {
    return this.chatsService.createChat(dto);
  }
}
