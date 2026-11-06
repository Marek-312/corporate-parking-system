import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ParkingSpotDTO } from './DTO/parking-spots-dto.js';
import { ParkingSpot } from '@prisma/client';

@Injectable()
export class ParkingSpotsService {
    constructor(private readonly prisma:PrismaService){}

    async addParkingSpot(companyID:number,zoneID:number,dto:ParkingSpotDTO):Promise<ParkingSpot>{
        const parkingZone=await this.prisma.parkingZone.findUnique({
            where:{
                id:zoneID,
                companyId:companyID,
            }
        });
        if(!parkingZone){
            throw new NotFoundException("There is no such parking zone in this company");
        }
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
    async findParkingSpot(companyID:number,zoneId:number,id:number):Promise<ParkingSpot>{
        const parkingZone=await this.prisma.parkingZone.findUnique({
            where:{
                id:zoneId,
                companyId:companyID,
            }
        });
        if(!parkingZone){
            throw new NotFoundException("There is no such parking zone in this company");
        }
        const parkSpot=await this.prisma.parkingSpot.findUnique({where:{
            id:id,zoneId:id,
        }});
        if(!parkSpot){
            throw new NotFoundException("There is no such parking zone in this company");
        }
        return parkSpot;
    }
}


