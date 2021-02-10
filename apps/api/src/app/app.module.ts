import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

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
    UserModule
  ]
})
export class AppModule {}
