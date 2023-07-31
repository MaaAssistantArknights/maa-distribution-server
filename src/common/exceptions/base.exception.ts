import { HttpStatus } from '@nestjs/common';

export class BaseException {
  constructor(
    public readonly status: HttpStatus,
    public readonly code: string,
    public readonly message: string,
  ) {}
}
