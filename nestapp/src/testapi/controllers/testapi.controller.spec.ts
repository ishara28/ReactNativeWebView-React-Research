import { Test, TestingModule } from '@nestjs/testing';
import { TestapiController } from './testapi.controller';

describe('TestapiController', () => {
  let controller: TestapiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestapiController],
    }).compile();

    controller = module.get<TestapiController>(TestapiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
