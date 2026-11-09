import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service.js';
import { VehiclesController } from './vehicles.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  providers: [VehiclesService,PrismaModule],
  controllers: [VehiclesController]
})
export class VehiclesModule {}
