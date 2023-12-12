import { Test, TestingModule } from '@nestjs/testing';
import { DivingClubsController } from './diving-clubs.controller';

describe('DivingClubsController', () => {
  let controller: DivingClubsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DivingClubsController],
    }).compile();

    controller = module.get<DivingClubsController>(DivingClubsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
