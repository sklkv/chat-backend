import {
  Controller,
  Get,
  Request,
  HttpCode,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@strategy/jwt/jwt.guard";
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
  getUserChats(@Request() req: { user: { id: number } }) {
    return this.chatsService.findUserChats(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Создание чата" })
  @ApiResponse({ status: 200, type: Chats })
  @Post("create")
  @HttpCode(200)
  createChat(@Body() dto: CreateChatDto) {
    return this.chatsService.createChat(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Удаление чата" })
  @ApiResponse({ status: 200 })
  @Delete(":id")
  @HttpCode(200)
  deleteChat(@Param("id") id: string) {
    return this.chatsService.deleteChat({ chatId: id });
  }
}
