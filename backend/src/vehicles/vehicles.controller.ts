import {Body,Param, Controller,Post,Delete,Get,Patch, ValidationPipe,Request, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Vehicle } from '@prisma/client';
import { VehicleDTO } from './DTO/vehicles-DTO.js';
import { VehiclesService } from './vehicles.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
interface AuthenticatedRequest {
  user: { userId: number; companyId: number; role: string };
}

@UseGuards(JwtAuthGuard)
@Controller('vehicles')
@ApiTags('vehicles')
export class VehiclesController {
    constructor(private readonly service:VehiclesService){}
    @Post()
    async CreateAVehicle(@Request() req:AuthenticatedRequest,@Body(ValidationPipe)dto:VehicleDTO):Promise<Vehicle>{
        return await this.service.createVehicle(req.user.userId,req.user.companyId,dto);

    }
    @Get()
     async FindAVehicle(@Request() req:AuthenticatedRequest):Promise<Vehicle>{
        return await this.service.findVehicle(req.user.userId,req.user.companyId);

    }
    @Get('plate')
    async FindAVehicleUsingLicencePlate(@Request()req:AuthenticatedRequest,@Param('plate')plate:string):Promise<Vehicle>{
        return await this.service.findVehicleWithLicencePlate(req.user.userId,req.user.companyId,plate);

    }
    @Delete('plate')
    async DeleteVehicleWithALicencePlate(@Request()req:AuthenticatedRequest,@Param('plate')plate:string):Promise<Vehicle>{
         return await this.service.deleteVehicleWithLicencePlate(req.user.userId,req.user.companyId,plate);

    }
    @Delete('plate')
    async DeleteVehicle(@Request()req:AuthenticatedRequest,@Param('plate')plate:string):Promise<Vehicle>{
         return await this.service.deleteVehicle(req.user.userId,req.user.companyId);

    }
    @Patch()
    async ChangeVehicle(@Request() req:AuthenticatedRequest,@Body(ValidationPipe)dto:VehicleDTO):Promise<Vehicle>{
        return await this.service.changeVehicle(req.user.userId,req.user.companyId,dto);

    }
    
}
