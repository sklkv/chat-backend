import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";
import { BadBaseException } from "./bad-base-exception";
import { RESPONSE_STATUS } from "../constants";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const message = exception.message;
    const isBaseBadException = exception instanceof BadBaseException;
    const status = exception.getStatus();

    response.status(isBaseBadException ? HttpStatus.OK : status).json({
      status: RESPONSE_STATUS.FAILED,
      response: { message },
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
