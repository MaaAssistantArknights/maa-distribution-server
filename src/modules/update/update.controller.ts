import { Controller, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateService } from './update.service';
import { HttpExceptionFilter } from '@/common/filters/exception.filter';
import { AllInterceptor } from '@/common/interceptor/all.interceptor';

@ApiTags('定时任务')
@Controller({
  path: 'update',
  version: '1',
})
export class UpdateController {
  constructor(private taskService: UpdateService) {}

  @ApiOperation({ summary: '手动更新release信息' })
  @UseInterceptors(new AllInterceptor())
  @UseFilters(new HttpExceptionFilter())
  @Post()
  manualStart() {
    this.taskService.update();
    return 'Task started';
  }
}
