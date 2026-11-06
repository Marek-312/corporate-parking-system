import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ParkingSpotDTO } from './DTO/parking-spots-dto.js';
import { ParkingSpot } from '@prisma/client';

@Injectable()
export class ParkingSpotsService {
    constructor(private readonly prisma:PrismaService){}

    async addParkingSpot(zoneID:number,dto:ParkingSpotDTO):Promise<ParkingSpot>{
        const parkSpot=await this.prisma.parkingSpot.create({
            data:{
                spotNumber:dto.spotNumber,
                positionX:dto.positionX,
                positionY:dto.positionY,
                blockedStatus:dto.blockedStatus,
                zoneId:zoneID,
            }
        });
    return parkSpot;

    }
}


