import {
  Controller,
  Get,
  Query,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReleaseService } from './release.service';
import { ReleaseQueryDto } from './dtos/release.query.dto';
import { HttpExceptionFilter } from '@/common/filters/exception.filter';
import { AllInterceptor } from '@/common/interceptor/all.interceptor';

@ApiTags('版本信息')
@Controller({
  path: 'release',
  version: '1',
})
export class ReleaseController {
  constructor(private readonly releaseService: ReleaseService) {}

  @ApiOperation({ summary: '获取最新版本信息' })
  @UseInterceptors(new AllInterceptor())
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  async getReleaseAsset(@Query() query: ReleaseQueryDto) {
    return this.releaseService.getReleaseAsset(query);
  }
}
