import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Vehicle } from '@prisma/client';
import { VehicleDTO } from './DTO/vehicles-DTO.js';


@Injectable()
export class VehiclesService {
    constructor(private readonly service:PrismaService){}
    private async checkPlateNum(companyId:number,plate:string){
        const foundCar=await this.service.vehicle.findFirst({where:{
            companyId:companyId,
            licensePlate:plate,
        }});
        if(foundCar!){
            throw new ConflictException('Wehicle with that plate already exists');
        }

    }
    async createVehicle(driverId:number,companyId:number,dto:VehicleDTO):Promise<VehicleDTO>{
        await this.checkPlateNum(companyId,dto.licensePlate);
        await this.service.vehicle.create({
            data:{
                brand: dto.brand,
                model: dto.model,
                licensePlate: dto.licensePlate,
                color: dto.color,
                companyId,
                driverId: driverId,
            },}
        );
        return dto;
    }
    async findAll(companyId:number,pageNumber:number,limit:number):Promise<VehicleDTO[]>{//finds all the company vehiclse
       return await this.service.vehicle.findMany({where:{
            companyId:companyId,
            skip: (pageNumber - 1) * limit,
            take: limit
        },
        select:{
            brand:true,
            model:true,
            licensePlate:true,
            color:true
        }
        });

    }
    async findByPlate(companyId:number,plate:string):Promise<VehicleDTO|null>{
        const foundVeh=await this.service.vehicle.findFirst(
            {
                where:{
                    companyId:companyId,
                    licensePlate:plate,
                },
                select:{
                    brand:true,
                    model:true,
                    licensePlate:true,
                    color:true
                }

            });
        if(foundVeh!){
            throw new NotFoundException('There is no such vehicle in this company');

        }
        return foundVeh;
    }
    
    //TE SERVICES WICH RETURNS ALL THE VEHICLES IN THE COMPANY
}
