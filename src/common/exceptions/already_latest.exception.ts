import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class AlreadyLatestException extends BaseException {
  constructor(message: string) {
    super(HttpStatus.OK, 'ALREADY_LATEST', message);
  }
}
