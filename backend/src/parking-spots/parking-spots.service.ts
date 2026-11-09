import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ParkingSpotDTO } from './DTO/parking-spots-dto.js';
import { ParkingSpot, SpotStatus } from '@prisma/client';
import { ParkingZone } from '@prisma/client';
@Injectable()
export class ParkingSpotsService {
    constructor(private readonly prisma:PrismaService){}

    private async findParkingZone(companyId:number,zoneId:number):Promise<ParkingZone>{
     const parkingZone=await this.prisma.parkingZone.findUnique({
            where:{
                id:zoneId,
                companyId:companyId,
            }
        });
        if(!parkingZone){
            throw new NotFoundException("There is no such parking zone in this company");
        }
        return parkingZone;
    }
    async addParkingSpot(companyID:number,zoneID:number,dto:ParkingSpotDTO):Promise<ParkingSpot>{
        const parkingZone=await this.findParkingZone(companyID,zoneID);
        const parkSpot=await this.prisma.parkingSpot.create({
            data:{
                spotNumber:dto.spotNumber,
                positionX:dto.positionX,
                positionY:dto.positionY,
                blockedStatus:dto.blockedStatus,
                zoneId:parkingZone.id,
            }
        });
    return parkSpot;

    }
    async findParkingSpot(companyID:number,zoneId:number,id:number):Promise<ParkingSpot>{
        const parkingZone=await this.findParkingZone(companyID,zoneId);
        const parkSpot=await this.prisma.parkingSpot.findUnique({where:{
            id:id,zoneId:parkingZone.id,
        }});
        if(!parkSpot){
            throw new NotFoundException("There are no such parking spots    ");
        }
        return parkSpot;
    }
    async findAllParkingSpotsInthisField(companyID:number,zoneId:number):Promise<ParkingSpot[]>{
          const parkingZone=await this.findParkingZone(companyID,zoneId);
          const parkingSpots=await this.prisma.parkingSpot.findMany({where:{
            zoneId:parkingZone.id,
          }});
          return parkingSpots;
    }
    async deleteParkingSpot(companyID:number,zoneId:number,id:number):Promise<ParkingSpot>{
         const parkingZone=await this.findParkingZone(companyID,zoneId);
          const parkingSpots=await this.prisma.parkingSpot.delete({where:{
            id:id,zoneId:parkingZone.id,
          }});
          return parkingSpots;

    }
    async changeParkingSpot(companyID:number,zoneId:number,id:number,dto:ParkingSpotDTO){
        const parkingSpot=await this.findParkingSpot(companyID,zoneId,id);
       
        const parkingSpot2=await this.prisma.parkingSpot.update({where:{
            id:id,
            zoneId:zoneId,
        },
            data:{
                spotNumber:dto.spotNumber,
                positionX:dto.positionX,
                positionY:dto.positionY,
                blockedStatus:dto.blockedStatus,
                zoneId:parkingSpot.zoneId,
            }
        });
        return parkingSpot2;
    }
    async changeParkingSpotStatus(companyID:number,zoneId:number,id:number,status:SpotStatus){
        const parkingSpot=await this.findParkingSpot(companyID,zoneId,id);
        if(parkingSpot.blockedStatus===status){
            return parkingSpot;
        }
        const parkingSpot2=await this.prisma.parkingSpot.update({where:{
            id:id,
            zoneId:zoneId,
        },data:{
            blockedStatus:status,
        }});
        return parkingSpot2;
    }
}


