import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto.js';
import * as bcrypt from 'bcrypt';
import { LoginDto} from './dto/login.dto.js';
import { AuthEntity } from './entity/auth.entity.js';



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
    const existingCompany=await this.prisma.company.findUnique({where:{id:dto.companyId}});
    if(!existingCompany){
        throw new BadRequestException('Ova kompanija ne postoji'
        );
    }
    const user = await this.prisma.user.create({
        data: {
            email: dto.email,
            passwordHash: hashedPassword,
            name: dto.name,
            companyId:existingCompany.id
        },
    });

    const { passwordHash, ...result } = user;
    return result;
  }
    async login(dto: LoginDto): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    const passwordValid =
      user && (await bcrypt.compare(dto.password, user.passwordHash));
    if (!user || !passwordValid) {
      throw new UnauthorizedException('Pogrešan email ili lozinka.');
    }
    const payload = { sub: user.id, companyId: user.companyId, role: user.role };

    return { accessToken: this.jwtService.sign(payload) };
  }
 
}   
