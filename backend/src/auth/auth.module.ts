import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module.js';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy.js';

@Module({
  imports:[
    
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
    
  ],
  controllers: [AuthController,],
  providers: [AuthService,
     PrismaModule,
    AuthController,
    PassportModule,
    JwtStrategy,
  ],
  exports:[AuthService,
     PrismaModule,
    AuthController,
    PassportModule
  ]
})
export class AuthModule {}
