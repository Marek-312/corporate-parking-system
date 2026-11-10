import { Module } from '@nestjs/common';
import { ParkingSessionsService } from './parking-sessions.service.js';
import { ParkingSessionsController } from './parking-sessions.controller.js';

@Module({
  providers: [ParkingSessionsService],
  controllers: [ParkingSessionsController]
})
export class ParkingSessionsModule {}
