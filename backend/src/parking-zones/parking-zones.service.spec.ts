import { Test, TestingModule } from '@nestjs/testing';
import { ParkingZonesService } from './parking-zones.service.js';

describe('ParkingZonesService', () => {
  let service: ParkingZonesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingZonesService],
    }).compile();

    service = module.get<ParkingZonesService>(ParkingZonesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
