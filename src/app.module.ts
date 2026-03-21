import { Module, OnModuleInit } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { InjectConnection, SequelizeModule } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { AuthModule } from "@modules/auth/auth.module";
import { ChatsModule } from "@modules/chats/chats.module";
import { UsersModule } from "@modules/users/users.module";
import { MessagesModule } from "@modules/messages/messages.module";
import { EventsModule } from "@modules/events/events.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [],
      autoLoadModels: true,
      synchronize: false,
    }),
    AuthModule,
    ChatsModule,
    UsersModule,
    MessagesModule,
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(@InjectConnection() private sequelize: Sequelize) {}

  async onModuleInit() {
    // TODO: remove DROP after first restart — one-time fix for user_id column type (was UUID, should be INTEGER)
    await this.sequelize.query('DROP TABLE IF EXISTS "messages" CASCADE');
    await this.sequelize.sync();
  }
}
