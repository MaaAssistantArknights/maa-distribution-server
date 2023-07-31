import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import type { Response } from 'express';

import { BaseException } from '@/common/exceptions/base.exception';

@Catch(BaseException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: BaseException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof BaseException
        ? exception.status
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception.message
      ? exception.message
      : `${status >= 500 ? 'Service Error' : 'Client Error'}`;

    response.status(status).json({
      code: status,
      message,
    });
  }
}
