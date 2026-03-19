export enum WS_EVENTS {
  // Client → Server
  SEND_MESSAGE = "user-dispatch-message",
  JOIN_CHAT = "join-chat",
  LEAVE_CHAT = "leave-chat",
  TYPING = "user-typing",
  STOP_TYPING = "user-stop-typing",
  // Server → Client
  RECEIVE_MESSAGE = "server-dispatch-message",
  SERVER_TYPING = "server-user-typing",
  SERVER_STOP_TYPING = "server-user-stop-typing",
}

export enum RESPONSE_STATUS {
  OK = "OK",
  FAILED = "FAILED",
}

// TODO: вынести интерфейсы
export interface IStatusResponse {
  status: RESPONSE_STATUS;
}

export interface IJwtPayload {
  sub: number;
  email: string;
  phoneNumber: string;
  username: string;
}

export const JWT_SECRET = "a-string-secret-at-least-256-bits-long";
