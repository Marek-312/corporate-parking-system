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
    async createVehicle(@Request() req: AuthenticatedRequest, @Body(ValidationPipe) dto: VehicleDTO):Promise<VehicleDTO>{
        return await this.service.createVehicle(req.user.userId,req.user.companyId, dto);

    }
    @Get(':pageNumber/:pageLimit')
    async findAllVehicles(@Request()req:AuthenticatedRequest,@Param('pageNumber',ParseIntPipe)pageNumber:number,@Param('pageNumber',ParseIntPipe)limit:number,){
        return await this.service.findAll(req.user.userId,pageNumber,limit);
    }
    
}
