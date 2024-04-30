import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Chats } from "./chats.model";
import { ChatsService } from "./chats.service";
import { CreateChatDto } from "./dto";

@ApiTags("chats")
@Controller("chats")
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  @ApiOperation({ summary: "Получение списка чатов пользователя" })
  @ApiResponse({ status: 200, type: [Chats] })
  @Get(":participant_id")
  getUserChats(@Param("participant_id") participant_id: string) {
    return this.chatsService.findUserChats({
      participant_id,
    });
  }

  @ApiOperation({ summary: "Создание чата" })
  @ApiResponse({ status: 200, type: Chats })
  @Post("/create")
  createChat(@Body() dto: CreateChatDto) {
    return this.chatsService.createChat(dto);
  }
}
