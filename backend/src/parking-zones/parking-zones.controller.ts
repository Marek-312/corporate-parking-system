import { Controller, Post,Body, UseGuards,Request,Delete, Get, Patch, ParseIntPipe,ValidationPipe} from '@nestjs/common';
import { ParkingZoneDTO } from './DTO/parking-zones-dto.js';
import { ApiTags } from '@nestjs/swagger';
import { ParkingZonesService } from './parking-zones.service.js';
import { ParkingZone, User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { Param } from '@nestjs/common';

interface AuthenticatedRequest {
  user: { userId: number; companyId: number; role: string };
}

@UseGuards(JwtAuthGuard)
@Controller('parking-zones')
@ApiTags('parking-zones')
export class ParkingZonesController {
    constructor(private readonly service:ParkingZonesService){}
   
    @Post()
    async createParkingZone(@Request() req:AuthenticatedRequest ,@Body(ValidationPipe) dto:ParkingZoneDTO):Promise<ParkingZone>{
        return await this.service.CreateNewZone(req.user.companyId,dto);
    }
    @Get()
    async getParkingZone(@Request() req:AuthenticatedRequest,@Param('id',ParseIntPipe)id:number):Promise<ParkingZone>{
        return await this.service.GetParkingZone(req.user.companyId,id);
    }
    @Get()
    async getAllParkingZones(@Request()req:AuthenticatedRequest):Promise<ParkingZone[]>{
        return await this.service.GetAllParkingZones(req.user.companyId);
    }
    @Patch()
    async updateParkingZone(@Request() req:AuthenticatedRequest,@Param('id', ParseIntPipe) id: number,@Body(ValidationPipe) dto:ParkingZoneDTO):Promise<ParkingZone>{
        return await this.service.UpdateParkingZone(req.user.companyId,id,dto);
    }
    @Delete()
    async deleteParkingZone(@Request()req:AuthenticatedRequest,@Param('id',ParseIntPipe)id:number):Promise<ParkingZone>{
        return await this.service.DeleteParkingZone(req.user.companyId,id);
    }

}
