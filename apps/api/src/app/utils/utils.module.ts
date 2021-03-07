import { ImageToolsConsumer } from './image-tools/image-tools.consumer';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { Module, Global } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { FileToolsService } from './file-tools/file-tools.service';
import { ImageToolsService } from './image-tools/image-tools.service';

@Global()
@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'image-resizer',
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          name: 'image-resizer',
          redis: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT')
          }
        };
      },
      inject: [ConfigService]
    })
  ],
  providers: [FileToolsService, ImageToolsService, ImageToolsConsumer],
  exports: [FileToolsService, ImageToolsService]
})
export class UtilsModule {}
