import { Module } from '@nestjs/common';
import { ReleaseService } from './release.service';
import { ReleaseController } from './release.controller';
import { StateModule } from '@/modules/state/state.module';

@Module({
  imports: [StateModule],
  providers: [ReleaseService],
  controllers: [ReleaseController],
})
export class ReleaseModule {}
