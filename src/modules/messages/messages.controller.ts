import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Messages } from "./messages.model";
import { MessagesService } from "./messages.service";
import { CreateMessageDto } from "./dto";

@ApiTags("messages")
@Controller("messages")
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @ApiOperation({ summary: "Получение сообщения чата согласно диапазону" })
  @ApiResponse({ status: 200, type: [Messages] })
  @Get([":chat_id", ":from", ":to"])
  getChatMessages(
    @Param("chat_id") chat_id: string,
    @Param("from") from: number,
    @Param("to") to: number
  ) {
    return this.messagesService.getChatMessages({
      chat_id,
      from,
      to,
    });
  }

  @ApiOperation({ summary: "Сохранение сообщения" })
  @ApiResponse({ status: 200, type: Messages })
  @Post("/create")
  createMessage(@Body() dto: CreateMessageDto) {
    return this.messagesService.createMessage(dto);
  }
}
