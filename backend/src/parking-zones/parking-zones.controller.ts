import { Controller, Post,Body, UseGuards } from '@nestjs/common';
import { ParkingZoneDTO } from './DTO/parking-zones-dto.js';
import { ApiTags } from '@nestjs/swagger';
import { ParkingZonesService } from './parking-zones.service.js';
import { ParkingZone } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@UseGuards(JwtAuthGuard)
@Controller('parking-zones')
@ApiTags('parking-zones')
export class ParkingZonesController {
    constructor(private readonly service:ParkingZonesService){}
   
    @Post('parking-zones')
    async createParkingZone(@Body() dto:ParkingZoneDTO):Promise<ParkingZone>{
        return await this.service.CreateNewZone(dto);
    }

}
