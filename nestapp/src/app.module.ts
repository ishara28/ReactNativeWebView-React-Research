import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestapiModule } from './testapi/testapi.module';

@Module({
  imports: [TestapiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
