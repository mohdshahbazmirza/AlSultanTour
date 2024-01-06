import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { userModule } from './users/user.module';
import { tourModule } from './tours/tour.module';

@Module({
  imports: [userModule , tourModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
