import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ModuleModuleCompany } from './companies/module/module.module.js';
import { ModuleModuleUser } from './users/module/module.module.js';
import { UsersModule } from './users/users.module.js';
import { CompaniesModule } from './companies/companies.module.js';
import { PrismaModule } from './prisma/prisma.module.js';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    
  
    ModuleModuleUser,
    ModuleModuleCompany,
    UsersModule,
    CompaniesModule,
    PrismaModule,
  ],
})
export class AppModule {}