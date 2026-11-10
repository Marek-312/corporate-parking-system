import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ParkingSesssionDTO } from './DTO/parking-session-dto.js';
import { ParkingSession, SpotStatus } from '@prisma/client';
import { create } from 'domain';
import { ConfigModule } from '@nestjs/config';
@Injectable()
export class ParkingSessionsService {
    constructor(private readonly service:PrismaService){}
    
    async parkTheCar(companyId:number,zoneId:number,spotId:number,vehicleId:number):Promise<ParkingSession>{
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

                //parking spot secuirity check
                const parkingSpot=await tx.parkingSpot.findFirst({where:{id:spotId,
                    zoneId:existingZone.id
                }});
                if(!parkingSpot){
                    throw new NotFoundException(`There is no such parking spot`);

                }
                if(parkingSpot!.blockedStatus!=SpotStatus.FREE){
                    throw new ConflictException(`This spot is taken`);
                }
                //checking if the cars not already parked
                const parkingSessionForCar=await tx.parkingSession.findFirst({where:{
                    vehicle:{id:vehicleId,companyId:companyId},exitTime:null
                }});
                if(parkingSessionForCar){
                    throw new ConflictException(`This car is already parked in this company`);
                }
                //from this point on we are sure that there are no conflicts and that we can create a new session
                const newParkingSession=await tx.parkingSession.create({data:{
                    spotId:spotId,
                    vehicleId:vehicleId,
             
                }});
                return newParkingSession;
              
                

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
