import { Test, TestingModule } from '@nestjs/testing';
import { ParkingZonesController } from './parking-zones.controller.js';

describe('ParkingZonesController', () => {
  let controller: ParkingZonesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingZonesController],
    }).compile();

    controller = module.get<ParkingZonesController>(ParkingZonesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
