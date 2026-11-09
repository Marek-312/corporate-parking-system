import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service.js';
import { VehiclesController } from './vehicles.controller.js';

@Module({
  providers: [VehiclesService],
  controllers: [VehiclesController]
})
export class VehiclesModule {}
