import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module.js';

export const jwtSecret = 'zjP9h6ZI5LoSKCRj';
@Module({
  imports:[
    PrismaModule,
    AuthService,
    AuthController,
    PassportModule,
    JwtModule.register({
      secret:jwtSecret,
      signOptions:{expiresIn:'5m'},
    })
  ],
  controllers: [AuthController,],
  providers: [AuthService,],
})
export class AuthModule {}
