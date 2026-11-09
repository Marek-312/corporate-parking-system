import { Module } from '@nestjs/common';
import { ParkingSpotsService } from './parking-spots.service.js';
import { ParkingSpotsController } from './parking-spots.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  providers: [ParkingSpotsService,PrismaModule],
  controllers: [ParkingSpotsController]
})
export class ParkingSpotsModule {}
