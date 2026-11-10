import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ParkingSesssionDTO } from './DTO/parking-session-dto.js';
import { ParkingSession, SpotStatus } from '@prisma/client';
import { create } from 'domain';
import { ConfigModule } from '@nestjs/config';
@Injectable()
export class ParkingSessionsService {
    constructor(private readonly service:PrismaService){}
    
    async parkTheCar(companyId:number,zoneId:number,spotId:number,vehicleId:number,dto:ParkingSesssionDTO):Promise<ParkingSesssion>{
        //no need for checking the company existence
        return this.service.$transaction(async (tx)=>{
                //company check
                const existingCompany=await tx.company.findUnique({where:{id:companyId}});
                if(!existingCompany){
                    throw new NotFoundException(`This company does not exist`);
                }
                //checking wheteer the car is already parked there
                //zone security check


                const existingZone=await tx.parkingZone.findUnique({where:{id:zoneId,
                    companyId:companyId,

                }})
                if(!existingZone){
                    throw new NotFoundException(`There is no such zone in this company`);
                }

                
                const parkingSessionForCar=await tx.parkingSession.findFirst({where:{vehicleId:vehicleId}});
                if(parkingSessionForCar){
                    throw new ConflictException(`This car is already parked in this company`);
                }
                //checking if spot is taken and that it exists
                const parkingSpot=await tx.parkingSpot.findFirst({where:{id:spotId}});
                if(parkingSpot!){
                    throw new NotFoundException(`There is no such parking spot`);

                }
                if(parkingSpot!.blockedStatus!=SpotStatus.FREE){
                    throw new ConflictException(`This spot is taken`);
                }
                

            }
        );
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
