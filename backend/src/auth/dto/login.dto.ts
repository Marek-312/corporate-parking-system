import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class LoginDto{
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    @MinLength()
    email:string;
}