import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { AuthEntity } from './entity/auth.entity.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';

//import { Throttle } from '@nestjs/throttler';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

 @UseGuards(JwtAuthGuard)
@Get('me')
me(@Request() req: { user: { userId: number; companyId: number; role: string } }) {
  return req.user;
}
}