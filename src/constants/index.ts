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
