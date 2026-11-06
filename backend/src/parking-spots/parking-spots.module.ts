import { Module } from '@nestjs/common';
import { ParkingSpotsService } from './parking-spots.service.js';
import { ParkingSpotsController } from './parking-spots.controller.js';

@Module({
  providers: [ParkingSpotsService],
  controllers: [ParkingSpotsController]
})
export class ParkingSpotsModule {}
