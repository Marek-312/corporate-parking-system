import { IsString ,IsNotEmpty} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class VehicleDTO{
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    brand:string;

    @IsNotEmpty() 
    @IsString()
    @ApiProperty()
    model:string;

    @IsNotEmpty() 
    @IsString()
    @ApiProperty()
    licensePlate:string;

    
    @IsNotEmpty() 
    @IsString()
    @ApiProperty()
    color:string;

    
}