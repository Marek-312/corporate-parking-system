import { Module } from '@nestjs/common';
import { ParkingZonesService } from './parking-zones.service.js';
import { ParkingZonesController } from './parking-zones.controller.js';
import { Prisma } from '@prisma/client';
@Module({
  providers: [ParkingZonesService],
  controllers: [ParkingZonesController]
})
export class ParkingZonesModule {}
