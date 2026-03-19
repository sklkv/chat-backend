import { Controller, Get, Post, Param, Query, Body, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@strategy/jwt/jwt.guard";
import { Messages } from "./messages.model";
import { MessagesService } from "./messages.service";
import { CreateMessageDto } from "./dto";

@ApiTags("messages")
@Controller("messages")
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Получение сообщений чата по диапазону" })
  @ApiQuery({ name: "from", required: false, example: 0 })
  @ApiQuery({ name: "to", required: false, example: 50 })
  @ApiResponse({ status: 200, type: [Messages] })
  @Get(":chat_id")
  getChatMessages(
    @Param("chat_id") chat_id: string,
    @Query("from") from: number = 0,
    @Query("to") to: number = 50
  ) {
    return this.messagesService.getChatMessages({ chat_id, from, to });
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Сохранение сообщения" })
  @ApiResponse({ status: 200, type: Messages })
  @Post("create")
  createMessage(@Body() dto: CreateMessageDto) {
    return this.messagesService.createMessage(dto);
  }
}
