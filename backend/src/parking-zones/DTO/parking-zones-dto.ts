import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
export class ParkingZoneDTO{
    @IsString()
    name:String;
    @IsNumber()
    floor:number;
    @IsNumber()
    gridWidth:number;
    @IsNumber()
    gridHeight:number;
}