import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ModuleModuleCompany } from './companies/module/module.module.js';
import { ModuleModuleUser } from './users/module/module.module.js';
import { UsersModule } from './users/users.module.js';
import { CompaniesModule } from './companies/companies.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ParkingZonesModule } from './parking-zones/parking-zones.module.js';

import { VehiclesModule } from './vehicles/vehicles.module.js';
import { ParkingSpotsModule } from './parking-spots/parking-spots.module.js';
import { ParkingSessionsModule } from './parking-sessions/parking-sessions.module.js';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    ModuleModuleUser,
    ModuleModuleCompany,
    UsersModule,
    CompaniesModule,
    PrismaModule,
    AuthModule,
    ParkingZonesModule,
  VehiclesModule,
    ParkingSpotsModule,
    ParkingSessionsModule,
  ],
})
export class AppModule {}