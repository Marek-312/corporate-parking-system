import { IsInt,IsNotEmpty,IsString,IsDate, } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class ParkingSesssionDTO{
    @IsDate()
    @IsNotEmpty()
    @ApiProperty()
    entryTime:Date;
    @IsDate()
    @IsNotEmpty()
    @ApiProperty()
    exitTime:Date;
}