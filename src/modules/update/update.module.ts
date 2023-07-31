import { Module } from '@nestjs/common';
import { UpdateService } from './update.service';
import { UpdateController } from './update.controller';
import { StateModule } from '@/modules/state/state.module';

@Module({
  imports: [StateModule],
  providers: [UpdateService],
  controllers: [UpdateController],
})
export class UpdateModule {}
