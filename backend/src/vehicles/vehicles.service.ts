import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Vehicle } from '@prisma/client';
import { VehicleDTO } from './DTO/vehicles-DTO.js';
@Injectable()
export class VehiclesService {
    constructor(private readonly service:PrismaService){}
    async createVehicle(userId:number,companyId:number,dto:VehicleDTO):Promise<Vehicle>{
        return await this.service.vehicle.create({data:{
        brand:dto.brand,
        model:dto.model,
        licensePlate:dto.licencePlate,
        color:dto.color,
        companyId:companyId,
        driverId:userId,
        }});   

    }
    async findVehicle(userId:number,companyId:number):Promise<Vehicle>{
        const foundVehice=await this.service.vehicle.findFirst({where:{
            companyId:companyId,
            driverId:userId,
        }});
        if(!foundVehice){
            throw new NotFoundException("There is no such vehicle");
        }
        return foundVehice;

    }
    async findVehicleWithLicencePlate(userId:number,companyId:number,licensePlate:string):Promise<Vehicle>{
        const foundVehice=await this.service.vehicle.findFirst({where:{
            companyId:companyId,
            driverId:userId,
            licensePlate:licensePlate
        }});
        if(!foundVehice){
            throw new NotFoundException("There is no such vehicle");
        }
        return foundVehice;

    }
     async deleteVehicleWithLicencePlate(userId:number,companyId:number,licensePlate:string):Promise<Vehicle>{
        const foundVehice=await this.findVehicleWithLicencePlate(userId,companyId,licensePlate);
        if(!foundVehice){
            throw new NotFoundException("There is no such vehicle");
        }
        return await this.service.vehicle.delete({where:{
            id:foundVehice.id,
        }});
    }
    
    
     async deleteVehicle(userId:number,companyId:number):Promise<Vehicle>{
        const foundVehice=await this.findVehicle(userId,companyId);
        if(!foundVehice){
            throw new NotFoundException("There is no such vehicle");
        }
        return await this.service.vehicle.delete({where:{
            id:foundVehice.id,
        }});
    }
    async changeVehicle(userId:number,companyId:number,dto:VehicleDTO):Promise<Vehicle>{
        const foundVehice=await this.findVehicle(userId,companyId);
        if(!foundVehice){
            
            throw new NotFoundException("There is no such vehicle");
        }
 
        return await this.service.vehicle.update({where:{id:foundVehice.id},data:{
        brand:dto.brand,
        model:dto.model,
        licensePlate:dto.licencePlate,
        color:dto.color,
        companyId:companyId,
        driverId:userId,
        }});   

    }
}
