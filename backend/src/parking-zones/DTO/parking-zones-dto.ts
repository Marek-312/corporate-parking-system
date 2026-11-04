import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString,IsNotEmpty } from "class-validator";
export class ParkingZoneDTO{
    
    @IsString()
    @IsNotEmpty()
    name:String;
    @IsNotEmpty()
    @IsNumber()
    floor:number;
    @IsNotEmpty()
    @IsNumber()
    gridWidth:number;
    @IsNumber()
    @IsNotEmpty()
    gridHeight:number;
    @IsNumber()
    @IsNotEmpty()
    companyID:number;
}