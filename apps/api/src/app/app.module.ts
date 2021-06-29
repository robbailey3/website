import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';
import { PhotosModule } from './photos/photos.module';
import { UtilsModule } from './utils/utils.module';
import { PhotoAlbumsModule } from './photo-albums/photo-albums.module';
import { DevDiaryModule } from './dev-diary/dev-diary.module';
import { BlogModule } from './blog/blog.module';
import { TasksModule } from './tasks/tasks.module';
import { RunsModule } from './runs/runs.module';

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
    UsersModule,
    PhotosModule,
    UtilsModule,
    PhotoAlbumsModule,
    DevDiaryModule,
    BlogModule,
    TasksModule,
    RunsModule
  ]
})
export class AppModule {}
