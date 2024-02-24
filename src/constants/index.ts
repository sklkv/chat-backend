export enum RESPONSE_STATUS {
  OK = "OK",
  FAILED = "FAILED",
}

export interface IStatusResponse {
  status: RESPONSE_STATUS;
}
