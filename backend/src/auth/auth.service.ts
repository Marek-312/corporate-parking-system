import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        private readonly prisma:PrismaService,
        private readonly jwtService:JwtService
    ){}
    async register(data:{email:string;password:string;}){
        const existingUser=await this.prisma.user.findUnique({
            where :{email:data.email},
        });
        if(existingUser){
            throw new BadRequestException('Korisnik sa ovim email-om već postoji.');
        }
        const hashedPassword=await bcrypt.hash(data.password,10);  
        const user=await this.prisma.user.create({
            data:{
                email:data.email,
                passwordHash:hashedPassword,
                
            },
        });
    }
}   
