import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { PhotosModule } from './photos/photos.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    AuthModule,
    SharedModule,
    ConfigModule.forRoot({
      cache: false,
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? './apps/api/.env'
          : './apps/api/.dev.env'
    }),
    UserModule,
    PhotosModule,
    UtilsModule
  ]
})
export class AppModule {}
