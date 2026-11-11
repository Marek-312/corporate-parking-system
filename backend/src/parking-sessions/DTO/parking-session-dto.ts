import { IsInt,IsNotEmpty,IsString,IsDate, IsOptional, } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsAfter } from "../../validators/is-after-validator.js";
export class ParkingSesssionDTO{
    @IsDate()
    @IsNotEmpty()
    @ApiProperty()
    entryTime:Date;
    @IsOptional()
    @IsDate()
    @IsNotEmpty()
    @ApiProperty({required:false})
    @IsAfter('entryTime', {
        message: 'End time must be after start time'
    })
    exitTime:Date;
}