import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { randomUUID } from "crypto";
import { Chats } from "./chats.model";
import { CreateChatDto, FindUserChatsDto } from "./dto";

@Injectable()
export class ChatsService {
  constructor(@InjectModel(Chats) private chatsRepository: typeof Chats) {}

  async createChat(dto: CreateChatDto): Promise<Chats> {
    const chat = await this.chatsRepository.create({
      id: randomUUID(),
      ...dto,
    });

    return chat;
  }

  async findUserChats(dto: FindUserChatsDto): Promise<Chats[]> {
    const chats = await this.chatsRepository.findAll({
      where: {
        participants: {
          include: dto.participant_id,
        },
      },
    });

    return chats;
  }
}
