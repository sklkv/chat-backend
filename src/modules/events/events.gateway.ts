import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway(Number(process.env.WS_PORT), {
  cors: {
    origin: "*",
  },
  transports: ["websocket"],
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage("new-connection")
  async newConnection(@MessageBody() data: string) {
    console.log(data);
  }

  @SubscribeMessage("user-dispatch-message")
  async userDispatchMessage(@MessageBody() data: string) {
    this.server.emit("server-dispatch-message", data);
  }
}
