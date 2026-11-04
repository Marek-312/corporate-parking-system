import { Controller, Post } from '@nestjs/common';
import { ParkingZoneDTO } from './DTO/parking-zones-dto.js';
import { ApiTags } from '@nestjs/swagger';
import { ParkingZonesService } from './parking-zones.service.js';
import { ParkingZone } from '@prisma/client';

@Controller('parking-zones')
@ApiTags('parking-zones/CRUD')
export class ParkingZonesController {
    constructor(private readonly service:ParkingZonesService){}
    @Post('create-ParkingZone')
    async createParkingZone(dto:ParkingZoneDTO):Promise<ParkingZone>{
        return await this.service.CreateNewZone(dto);
    }

}
