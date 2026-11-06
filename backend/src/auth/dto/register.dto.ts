import { IsEmail, IsInt, IsOptional, IsString, MinLength ,IsNotEmpty} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class RegisterDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsEmail({}, { message: 'Neispravan format email adrese.' })
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @MinLength(6, { message: 'Lozinka mora imati najmanje 6 karaktera.' })
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsInt({ message: 'Company ID mora biti ceo broj.' })
  companyId: number; // Obavezno polje prema šemi
}