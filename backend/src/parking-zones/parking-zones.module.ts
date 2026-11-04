import { Module } from '@nestjs/common';
import { ParkingZonesService } from './parking-zones.service.js';
import { ParkingZonesController } from './parking-zones.controller.js';
import { Prisma } from '@prisma/client';
import { PrismaModule } from '../prisma/prisma.module.js';
@Module({
  providers: [ParkingZonesService,PrismaModule],
  controllers: [ParkingZonesController]
})
export class ParkingZonesModule {}
