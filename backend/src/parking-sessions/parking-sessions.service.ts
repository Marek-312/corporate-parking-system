import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
@Injectable()
export class ParkingSessionsService {
    constructor(private readonly service:PrismaService){}
    async parkTheCar(companyId:number,zoneId:number,spotId:number,vehicleId:number):Promise<ParkingSessionDTO>{
        //no need for checking the company existence
        const existingZone=await this.service.parkingZone.findUnique({
            where:{
                id:zoneId,
                companyId:companyId
            }
        })
        if(!existingZone){
            throw new NotFoundException('There is no such parking zone in this company');
        }

    }
}
