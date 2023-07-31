import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class ResourceNotAvailableException extends BaseException {
  constructor(message: string) {
    super(HttpStatus.SERVICE_UNAVAILABLE, 'RESOURCE_NOT_AVAILABLE', message);
  }
}
