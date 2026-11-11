import { Module } from '@nestjs/common';
import { ParkingSessionsService } from './parking-sessions.service.js';
import { ParkingSessionsController } from './parking-sessions.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
@Module({
  providers: [ PrismaModule ,ParkingSessionsService],
  controllers: [ParkingSessionsController]
})
export class ParkingSessionsModule {}
