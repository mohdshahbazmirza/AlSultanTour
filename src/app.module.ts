import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { userModule } from './users/user.module';
import { tourModule } from './tours/tour.module';
import { S3Module } from './service modules/s3/s3.module';

@Module({
  imports: [userModule , tourModule , S3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
