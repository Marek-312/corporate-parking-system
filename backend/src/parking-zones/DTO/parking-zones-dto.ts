import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString,IsNotEmpty } from "class-validator";
export class ParkingZoneDTO{
    
    @IsString()
    @IsNotEmpty()
    name:string;
    @IsNotEmpty()
    @IsNumber()
    floor:number;
    @IsNotEmpty()
    @IsNumber()
    gridWidth:number;
    @IsNumber()
    @IsNotEmpty()
    gridHeight:number;
   
}