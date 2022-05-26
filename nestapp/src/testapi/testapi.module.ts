import { Module } from '@nestjs/common';
import { TestapiController } from './controllers/testapi.controller';
import { TestapiService } from './services/testapi.service';

@Module({
  controllers: [ TestapiController],
  providers: [TestapiService]
})
export class TestapiModule {}
