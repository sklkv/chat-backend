import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { randomUUID } from "crypto";
import { IJwtPayload } from "@constants/index";
import { Chats } from "./chats.model";
import { CreateChatDto, DeleteChatDto } from "./dto";

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

  async findUserChats(dto: IJwtPayload): Promise<Chats[]> {
    const chats = await this.chatsRepository.findAll({
      where: {
        participants: {
          [Op.contains]: [dto.sub],
        },
      },
    });

    return chats;
  }

  async deleteChat(dto: DeleteChatDto): Promise<void> {
    await this.chatsRepository.destroy({
      where: {
        id: dto.chatId,
      },
    });
  }
}
