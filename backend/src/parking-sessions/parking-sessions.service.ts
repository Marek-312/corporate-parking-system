import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ParkingSesssionDTO } from './DTO/parking-session-dto.js';
import { ParkingSession, SpotStatus } from '@prisma/client';
import { create } from 'domain';
@Injectable()
export class ParkingSessionsService {
    constructor(private readonly service:PrismaService){}
    
    async parkTheCar(companyId:number,zoneId:number,spotId:number,vehicleId:number,dto:ParkingSesssionDTO):Promise<ParkingSesssionDTO>{
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
        const existingSpot=await this.service.parkingSpot.findUnique({
            where:{
                id:spotId,
                zoneId:zoneId
            }
        });
        if(!existingSpot){
             throw new NotFoundException('There is no such parking spot in this zone ');
        }
        const existingVehicle=await this.service.vehicle.findUnique({
            where:{
                id:vehicleId,
                companyId:companyId
            }
        });
        if(!existingVehicle){
             throw new NotFoundException('There is no such car in this company ');
        }
        if(existingSpot.blockedStatus!=SpotStatus.FREE){
            throw new ConflictException(`This parking spot is ${existingSpot.blockedStatus}`);
        }
         await this.service.parkingSession.create({
            data:{
            entryTime:dto.entryTime,
            exitTime:dto.entryTime,
            spotId:spotId,
            vehicleId:vehicleId
            }
        });
        await this.service.parkingSpot.update({
            where:{
                id:spotId
            },
            data:{
                blockedStatus:SpotStatus.RESERVED
            }
        });
        return dto;
    }
    async unparkTheCarFromTheSpot(spotID:number):Promise<ParkingSession>{
        const foundSpot=await this.service.parkingSpot.findUnique({where:{id:spotID}});
        if(!foundSpot){
            throw new NotFoundException("THere is no such parking spot");
        }
        if(foundSpot.blockedStatus===SpotStatus.FREE){
            throw new ConflictException("This spot is already free");
        }
        const ps=await this.service.parkingSession.findFirst({where:{
                spotId:spotID,
            }
        });
        if(!ps){
             throw new NotFoundException("THere is no session for this spot");
        }
        await this.service.parkingSpot.update({where:{
            id:spotID,
            },
            data:{
                blockedStatus:SpotStatus.FREE,
            }
        })
        return await this.service.parkingSession.update({
            where:{
                id:ps.id
            },
            data:{
                exitTime:Date.now.toString(),
            }
        });
    }


    
}
