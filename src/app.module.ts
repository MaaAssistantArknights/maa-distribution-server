import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { UpdateModule } from './modules/update/update.module';
import { ReleaseModule } from './modules/release/release.module';

@Module({
  imports: [ScheduleModule.forRoot(), UpdateModule, ReleaseModule],
})
export class AppModule {}
