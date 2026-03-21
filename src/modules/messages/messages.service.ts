import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { randomUUID } from "crypto";
import { CreateMessageDto, GetMessagesDto } from "./dto";
import { Messages } from "./messages.model";

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Messages) private messagesRepository: typeof Messages
  ) {}

  async createMessage(dto: CreateMessageDto): Promise<Messages> {
    const messageDto = {
      ...dto,
      id: randomUUID(),
    };
    const message = await this.messagesRepository.create(messageDto);
    return message;
  }

  async getChatMessages(dto: GetMessagesDto): Promise<Messages[]> {
    const messages = await this.messagesRepository.findAll({
      where: { chat_id: dto.chat_id },
      limit: dto.to - dto.from,
      offset: dto.from,
      order: [["createdAt", "DESC"]],
    });
    return messages;
  }
}
