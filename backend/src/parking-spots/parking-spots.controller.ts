import { Controller, ParseIntPipe, UseGuards,Put, ValidationPipe ,Body,Param,Request,Post,Get, Req, Patch, Delete} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParkingSpotsService } from './parking-spots.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { ParkingSpotDTO } from './DTO/parking-spots-dto.js';
import { ParkingSpot } from '@prisma/client';
import {ApiBearerAuth}from '@nestjs/swagger'
import {RolesGuard} from '../common/roles.guard.js'
import {Roles} from '../common/roles.decorator.js'


export interface AuthenticatedRequest {
  user: { userId: number; companyId: number; role: string };
}

@ApiBearerAuth()
@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('parking-zones/:zoneId/spots')
@ApiTags(
    'parking-spots'
)
@UseGuards(JwtAuthGuard)
export class ParkingSpotsController {
    constructor(private readonly service:ParkingSpotsService){}

    @Roles('COMPANY_ADMIN', 'SUPER_ADMIN')
    @Post()
    async addParkingSpot(@Request() req:AuthenticatedRequest,@Param('zoneId',ParseIntPipe) zoneID:number,@Body(ValidationPipe) dto:ParkingSpotDTO):Promise<ParkingSpot>{
        return await this.service.addParkingSpot(req.user.companyId,zoneID,dto);
        
    }


    @Get(':id')
    async findParkingSpot(@Request() req:AuthenticatedRequest,@Param('zoneId',ParseIntPipe) zoneID:number,@Param('id',ParseIntPipe)id:number):Promise<ParkingSpot>{

        return await this.service.findParkingSpot(req.user.companyId,zoneID,id);
    }


    @Get()
    async findAllParkingSpots(@Request() req:AuthenticatedRequest,@Param('zoneId',ParseIntPipe) zoneID:number):Promise<ParkingSpot[]>{
        return await this.service.findAllParkingSpotsInthisField(req.user.companyId,zoneID);
    }


    @Roles('COMPANY_ADMIN', 'SUPER_ADMIN')
    @Delete(':id')
    async deleteParkingSpot(@Request() req:AuthenticatedRequest,@Param('zoneId',ParseIntPipe) zoneID:number,@Param('id',ParseIntPipe)id:number):Promise<ParkingSpot>{

        return await this.service.deleteParkingSpot(req.user.companyId,zoneID,id);
    }

    @Roles('COMPANY_ADMIN', 'SUPER_ADMIN')
    @Patch(':id')
    async changeParkingSpot(@Request() req:AuthenticatedRequest,@Param('zoneId',ParseIntPipe) zoneID:number,@Param('id',ParseIntPipe)id:number,@Body(ValidationPipe) dto:ParkingSpotDTO):Promise<ParkingSpot>{
        return await this.service.changeParkingSpot(req.user.companyId,zoneID,id,dto);
    }


}
