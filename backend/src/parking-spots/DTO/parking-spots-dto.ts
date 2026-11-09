import { IsNumber,IsString,IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ParkingSpot, SpotStatus } from "@prisma/client";
export class ParkingSpotDTO{

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    spotNumber:string;

  
    @IsNotEmpty()
    @ApiProperty()
    positionX:number;
        
   
    @IsNotEmpty()
    @ApiProperty()
    positionY:number 
    
  
    @IsNotEmpty()
    @ApiProperty({enum:['FREE',
        'RESERVED',
        'MAINTENANCE']})
    blockedStatus:SpotStatus;

    
}