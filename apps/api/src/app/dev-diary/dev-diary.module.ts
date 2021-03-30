import { Module } from '@nestjs/common';
import { DevDiaryService } from './dev-diary.service';
import { DevDiaryController } from './dev-diary.controller';

@Module({
  providers: [DevDiaryService],
  controllers: [DevDiaryController]
})
export class DevDiaryModule {}
