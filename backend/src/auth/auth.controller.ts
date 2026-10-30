import { Controller,Post,Body } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService,
   
    ){}
    @Post('Register')
    async register (@Body()registerDto:RegisterDto){
        return this.authService.register(registerDto);
    }
    @Post('Login')
    async Login(@Body()loginDto:LoginDto){
        return this.authService.login(loginDto);
    }
}
