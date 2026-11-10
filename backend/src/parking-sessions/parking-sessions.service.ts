import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ParkingSesssionDTO } from './DTO/parking-session-dto.js';
import { ParkingSession, SpotStatus } from '@prisma/client';
import { create } from 'domain';
@Injectable()
export class ParkingSessionsService {
    constructor(private readonly service:PrismaService){}
    
    async parkTheCar(companyId:number,zoneId:number,spotId:number,vehicleId:number,dto:ParkingSesssionDTO):Promise<ParkingSesssion>{
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
       
        await this.service.parkingSpot.update({
            where:{
                id:spotId
            },
            data:{
                blockedStatus:SpotStatus.RESERVED
            }
        });
        return   await this.service.parkingSession.create({
            data:{
 
            spotId:spotId,
            vehicleId:vehicleId
            }
        });;
    }
   async unparkTheCarFromTheSpot(companyId: number, zoneId: number, spotId: number): Promise<ParkingSession> {
    const session = await this.service.parkingSession.findFirst({
        where: { spotId, exitTime: null, spot: { zoneId, zone: { companyId } } },
    });
    if (!session) throw new NotFoundException('There is no active session on this spot');

    return this.service.parkingSession.update({
        where: { id: session.id },
        data: { exitTime: new Date() },
    });

    }
     async findAll(companyId: number, page:number,limit:number) {
        const where = { spot: { zone: { companyId } } };
        const [data, total] = await this.service.$transaction([
        this.service.parkingSession.findMany({
            where,
            include: { vehicle: true, spot: true },
            orderBy: { entryTime: 'desc' },
            skip: (page - 1) * limit,
            take: limit,
        }),
        this.service.parkingSession.count({ where }),
        ]);
        return { data, total, page, limit };
    }


    
}
