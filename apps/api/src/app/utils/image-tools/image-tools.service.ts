import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue, Job } from 'bull';

@Injectable()
export class ImageToolsService {
  constructor(
    @InjectQueue('image-resizer') private readonly imageResizeQueue: Queue
  ) {}

  public addToQueue(file: any) {
    this.imageResizeQueue.add('resize', file);
    console.log(this.imageResizeQueue);
  }
}
