import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ModuleModuleCompany } from './companies/module/module.module.js';
import { ModuleModuleUser } from './users/module/module.module.js';
import { UsersModule } from './users/users.module.js';
import { CompaniesModule } from './companies/companies.module.js';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DB'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ModuleModuleUser,
    ModuleModuleCompany,
    UsersModule,
    CompaniesModule,
  ],
})
export class AppModule {}