import { IsEmail, IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Neispravan format email adrese.' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Lozinka mora imati najmanje 6 karaktera.' })
  password: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsInt({ message: 'Company ID mora biti ceo broj.' })
  companyId: number; // Obavezno polje prema šemi
}