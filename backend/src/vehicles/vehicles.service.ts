import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Vehicle } from '@prisma/client';

@Injectable()
export class VehiclesService {
    constructor(private readonly service:PrismaService){}
    async createVehicle(userId,companyId:number,dto:VehicleDTO):Promise<Vehicle>{

        
    }
}
