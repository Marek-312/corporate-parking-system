import { Module } from '@nestjs/common';
import { ParkingZonesService } from './parking-zones.service.js';
import { ParkingZonesController } from './parking-zones.controller.js';

@Module({
  providers: [ParkingZonesService],
  controllers: [ParkingZonesController]
})
export class ParkingZonesModule {}
