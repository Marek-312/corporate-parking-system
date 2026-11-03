import { Controller,Post,Body } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { ApiOkResponse, ApiResponse,ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { AuthEntity } from './entity/auth.entity.js';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService:AuthService,
   
    ){}
    @Post('Register')
    async register (@Body()registerDto:RegisterDto){
        return this.authService.register(registerDto);
    }
    @Post('Login')
    @ApiOkResponse({type:AuthEntity})
    async Login(@Body()loginDto:LoginDto){
        return this.authService.login(loginDto);
    }
}
