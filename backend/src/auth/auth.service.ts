import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto.js';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto.js';
@Injectable()
export class AuthService {
    constructor(
        private readonly prisma:PrismaService,
        private readonly jwtService:JwtService
    ){}
    async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Korisnik sa ovim email-om već postoji.');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
        data: {
            email: dto.email,
            passwordHash: hashedPassword,
            name: dto.name,
            companyId: dto.companyId, // Prosleđujemo kompaniju
        },
    });

    const { passwordHash, ...result } = user;
    return result;
  }
    async login(dto:LoginDto){
        const existingUser=await this.prisma.user.findUnique({
            where:{email:dto.email}
        })
        if(!existingUser){
            throw new BadRequestException(
                'Ovaj korisnik ne postoji'
            );
        }
        const isPasswordValid=await bcrypt.compare(dto.password,existingUser.passwordHash);
        if(!isPasswordValid){
            throw new UnauthorizedException('Pogrešan email ili lozinka.');
        }

        const payload={sub:existingUser.id,email:existingUser.email};
        const accesToken=this.jwtService.sign(payload);
        return{
            accesToken:accesToken,
        };
    }
}   
