import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString,IsNotEmpty } from "class-validator";
export class ParkingZoneDTO{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name:string;
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    floor:number;
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    gridWidth:number;
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    gridHeight:number;
   
}