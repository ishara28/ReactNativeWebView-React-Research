import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { delay } from 'rxjs';
import { TestapiService } from '../services/testapi.service';

interface NumbersList {
  num1: number;
  num2: Number;
}

@Controller('testapi')
export class TestapiController {
  constructor(private testapiService: TestapiService) {}
  @Post('api1/:id')
  async hello_api1(@Param('id') id: string, @Body() numbers: NumbersList) {
    await this.sleep(5000);
    return this.testapiService.getAPI1Response(id, numbers);
  }
  
  @Post('api2/:id')
  async hello_api2(@Param('id') id: string, @Body() numbers: NumbersList) {
    await this.sleep(10000);
    return this.testapiService.getAPI2Response(id, numbers);
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
