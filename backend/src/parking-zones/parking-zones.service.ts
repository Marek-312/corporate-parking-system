import { BadRequestException, Injectable,NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ParkingZoneDTO } from './DTO/parking-zones-dto.js';
import { ParkingZone } from '@prisma/client';


@Injectable()
export class ParkingZonesService {
    constructor(private readonly prismaService:PrismaService){

    }
    async  CreateNewZone(companyID:number,dto:ParkingZoneDTO):Promise<ParkingZone>{
             
         const parkingZone=this.prismaService.parkingZone.create(
            {
                data:{
                name:dto.name,
                floor:dto.floor,
                gridHeight:dto.gridHeight,
                gridWidth:dto.gridWidth,
                companyId:companyID

                },
            },
        );
        return parkingZone;
    }
    async GetParkingZone(companyId:number,id:number):Promise<ParkingZone>{
        const foundParkingZone=await this.prismaService.parkingZone.findFirst({where:{id:id,companyId:companyId},});
        if(foundParkingZone===null){
            throw new NotFoundException('There is no such parking zone,or no such parking zone for that parking');
        }
        return foundParkingZone;

    }
    async GetAllParkingZones(companyID:number):Promise<ParkingZone[]>{
        const parkingZones=await this.prismaService.parkingZone.findMany({where:{companyId:companyID}});
      
        return parkingZones;
    }
    async UpdateParkingZone(companyId: number, id: number, dto: ParkingZoneDTO):Promise<ParkingZone>{
        const parkingZone=await this.prismaService.parkingZone.findFirst({where:{id,companyId:companyId}});
         if(!parkingZone){
            throw new NotFoundException('There is no such parking zone,or no such parking zone for that parking');
        }
        const updatedUser=this.prismaService.parkingZone.update({where:{
            id:id,companyId:companyId
        },data:dto,});
       
        return updatedUser;
    }
    async DeleteParkingZone(companyId:number,id:number):Promise<ParkingZone>{
        const parkingZone=await this.prismaService.parkingZone.findFirst({where:{id:id,companyId:companyId}});
        if(parkingZone===null){
             throw new NotFoundException('There is no such parking zone,or no such parking zone for that parking');
        }
        return await this.prismaService.parkingZone.delete({where:{id:parkingZone.id}});

    }
    
}
