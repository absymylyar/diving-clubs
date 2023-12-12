import { Test, TestingModule } from '@nestjs/testing';
import { DivingClubsService } from './diving-clubs.service';

describe('DivingClubsService', () => {
  let service: DivingClubsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DivingClubsService],
    }).compile();

    service = module.get<DivingClubsService>(DivingClubsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
