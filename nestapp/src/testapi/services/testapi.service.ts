import { Injectable } from '@nestjs/common';
interface NumbersList {
  num1: number;
  num2: Number;
}

@Injectable()
export class TestapiService {
  getAPI1Response(id: string, numbersList: NumbersList) {
    return {
      schema: 'v1',
      id: id,
      resource: {
        name: 'calculator',
        action: 'add',
        version: '1',
      },
      auth: {
        token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOi...',
      },
      body: {
        num1: numbersList.num1,
        num2: numbersList.num2,
      },
    };
  }

  getAPI2Response(id: string, numbersList: NumbersList) {
    return {
      schema: 'v2',
      id: id,
      resource: {
        name: 'calculator',
        action: 'add',
        version: '1',
      },
      auth: {
        token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOi...',
      },
      body: {
        num1: numbersList.num1,
        num2: numbersList.num2,
      },
    };
  }
}
