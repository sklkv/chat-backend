import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { MessagesService } from "@modules/messages/messages.service";
import { WS_EVENTS } from "@constants/index";

interface IDispatchMessagePayload {
  chat_id: string;
  user_id: number;
  type: string;
  text: string;
}

@WebSocketGateway(3001, {
  cors: { origin: "*" },
  transports: ["websocket"],
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private messagesService: MessagesService
  ) {}

  async handleConnection(client: Socket) {
    const token =
      client.handshake.auth?.token ||
      client.handshake.headers?.authorization?.replace("Bearer ", "");

    if (!token) {
      client.disconnect();
      return;
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>("JWT_SECRET"),
      });
      client.data.user = payload;
    } catch {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    // cleanup handled automatically by socket.io room management
  }

  @SubscribeMessage(WS_EVENTS.JOIN_CHAT)
  joinChat(
    @MessageBody() data: { chat_id: string },
    @ConnectedSocket() client: Socket
  ) {
    client.join(data.chat_id);
  }

  @SubscribeMessage(WS_EVENTS.LEAVE_CHAT)
  leaveChat(
    @MessageBody() data: { chat_id: string },
    @ConnectedSocket() client: Socket
  ) {
    client.leave(data.chat_id);
  }

  @SubscribeMessage(WS_EVENTS.SEND_MESSAGE)
  async userDispatchMessage(
    @MessageBody() data: IDispatchMessagePayload,
    @ConnectedSocket() client: Socket
  ) {
    if (!client.data.user) {
      client.disconnect();
      return;
    }

    const message = await this.messagesService.createMessage({
      chat_id: data.chat_id,
      user_id: data.user_id,
      type: data.type,
      text: data.text,
    });

    this.server.to(data.chat_id).emit(WS_EVENTS.RECEIVE_MESSAGE, message);
  }

  @SubscribeMessage(WS_EVENTS.TYPING)
  userTyping(
    @MessageBody() data: { chat_id: string },
    @ConnectedSocket() client: Socket
  ) {
    client.to(data.chat_id).emit(WS_EVENTS.SERVER_TYPING, {
      user: client.data.user,
    });
  }

  @SubscribeMessage(WS_EVENTS.STOP_TYPING)
  userStopTyping(
    @MessageBody() data: { chat_id: string },
    @ConnectedSocket() client: Socket
  ) {
    client.to(data.chat_id).emit(WS_EVENTS.SERVER_STOP_TYPING, {
      user: client.data.user,
    });
  }
}
