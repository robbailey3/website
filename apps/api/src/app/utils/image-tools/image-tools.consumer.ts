import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('image-resizer')
export class ImageToolsConsumer {
  @Process('resize')
  public handleResizeJob(job: Job) {
    console.log(job);
  }
}
