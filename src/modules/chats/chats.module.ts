import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ChatsService } from "./chats.service";
import { ChatsController } from "./chats.controller";
import { Chats } from "./chats.model";

@Module({
  providers: [ChatsService],
  controllers: [ChatsController],
  imports: [SequelizeModule.forFeature([Chats])],
  exports: [ChatsService],
})
export class ChatsModule {}
