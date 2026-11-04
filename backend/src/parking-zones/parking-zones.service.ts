import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ParkingZoneDTO } from './DTO/parking-zones-dto.js';
import { ParkingZone } from '@prisma/client';

@Injectable()
export class ParkingZonesService {
    constructor(private readonly prismaService:PrismaService){

    }
    async  CreateNewZone(dto:ParkingZoneDTO):Promise<ParkingZone>{
         const existingCompany=await this.prismaService.company.findUnique({
            where:{id:dto.companyID}
         });         
         if(!existingCompany){
            throw new BadRequestException('Ova kompanija ne postoji');
         }      
         const parkingZone=this.prismaService.parkingZone.create(
            {
                data:{
                name:dto.name,
                floor:dto.floor,
                gridHeight:dto.gridHeight,
                gridWidth:dto.gridWidth,
                companyId:dto.companyID

                },
            },
        );
        return parkingZone;
    }
    
}
