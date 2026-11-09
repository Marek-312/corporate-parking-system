import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Vehicle } from '@prisma/client';
import { VehicleDTO } from './DTO/vehicles-DTO.js';
@Injectable()
export class VehiclesService {
    constructor(private readonly service:PrismaService){}
    async createVehicle(userId:number,companyId:number,dto:VehicleDTO):Promise<Vehicle>{
        return await this.service.vehicle.create({data:{
        brand:dto.brand,
        model:dto.model,
        licensePlate:dto.licencePlate,
        color:dto.color,
        companyId:companyId,
        driverId:userId,
        }});   

    }
}
