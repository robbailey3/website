import { Global, Logger, Module } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Global()
@Module({
  providers: [DatabaseService, Logger],
  exports: [DatabaseService]
})
export class SharedModule {}
