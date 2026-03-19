import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { MessagesModule } from "@modules/messages/messages.module";
import { EventsGateway } from "./events.gateway";

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
      }),
    }),
    MessagesModule,
  ],
  providers: [EventsGateway],
})
export class EventsModule {}
