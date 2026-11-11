import { Controller,Post,Patch, ParseIntPipe,Get} from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { Request,Param,Query } from '@nestjs/common';
import { VehicleDTO } from '../vehicles/DTO/vehicles-DTO.js';
import { ParkingSession } from '@prisma/client';
import { ParkingSessionsService } from './parking-sessions.service.js';
interface AuthenticatedRequest {
  user: { userId: number; companyId: number; role: string };
}

@UseGuards(JwtAuthGuard)
@Controller('parking-sessions')
export class ParkingSessionsController {
    constructor(private readonly service:ParkingSessionsService){}
    
    @Post('park/:zoneId/:spotId/:vehicleId')
    async  park(
    @Request()req:AuthenticatedRequest
    ,@Param('zoneId',ParseIntPipe)zoneId:number,
    @Param('spotId',ParseIntPipe)spotId:number
    ,@Param('vehicleId',ParseIntPipe)vehicleId:number
    ):Promise<ParkingSession>{

        return await this.service.parkTheCar(req.user.companyId,zoneId,spotId,vehicleId);
    
    }

    @Patch('unpark/:zoneId/:spotId/:vehicleId')
    async  unpark(
    @Request()req:AuthenticatedRequest
    ,@Param('zoneId',ParseIntPipe)zoneId:number,
    @Param('spotId',ParseIntPipe)spotId:number
    ):Promise<ParkingSession>{

        return await this.service.unparkTheCarFromTheSpot(req.user.companyId,zoneId,spotId);
    
    }
    @Get()
    async getAllSessions(@Request()req:AuthenticatedRequest,@Query('pageNumber')pageNumber:number,@Query('limit')limit:number,){
        
        return await this.service.findAll(req.user.companyId,pageNumber,limit);
    }
}
