import { Module } from '@nestjs/common';
import { StepsInMemoryService } from './shared/storages/in-memory/steps.in-memory.service';
import { StepsController } from './steps/steps.controller';

@Module({
  providers: [StepsInMemoryService],
  controllers: [StepsController],
})
export class AppModule {}
