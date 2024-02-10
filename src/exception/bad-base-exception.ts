import { HttpException, HttpStatus } from '@nestjs/common';

export class BadBaseException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.OK);
  }
}
