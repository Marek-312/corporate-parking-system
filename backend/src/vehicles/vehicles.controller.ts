import {Body,Param, Controller,Post,Delete,Get,Patch, ValidationPipe,Request, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
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
    async createVehicle(@Request() req: AuthenticatedRequest, @Body(ValidationPipe) dto: VehicleDTO):Promise<VehicleDTO>{
        return await this.service.createVehicle(req.user.userId,req.user.companyId, dto);

    }
    @Get()
    async findAllVehicles(@Request()req:AuthenticatedRequest,@Query('pageNumber')pageNumber:number,@Query('pageNumber')limit:number,){
        return await this.service.findAll(req.user.companyId,pageNumber,limit);
    }
    @Get('Plate')
    async findVehicleByPlaye(@Request()req:AuthenticatedRequest,@Query('plate')plate:string)
    :Promise<VehicleDTO>{
        return await this.service.findByPlate(req.user.companyId,plate);
    }
    @Get(':id')
    async findOne(@Request()req:AuthenticatedRequest,@Param('id',ParseIntPipe)id:number):Promise<VehicleDTO>{
        return await this.service.findOne(req.user.companyId,id);
    }
    @Patch()
    async updateVehicle(@Request() req: AuthenticatedRequest, @Body(ValidationPipe) dto: VehicleDTO):Promise<VehicleDTO>{
        return await this.service.update(req.user.userId,req.user.companyId, dto);

    }
    @Delete(':id')
    async removeVehicle(@Request()req:AuthenticatedRequest,@Param('id',ParseIntPipe)id:number):Promise<VehicleDTO>{
        return await this.service.remove(req.user.companyId,id);
    }
    
}
