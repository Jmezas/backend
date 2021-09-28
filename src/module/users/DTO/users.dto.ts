import { IsNotEmpty, IsString, MaxLength, IsEmail, MinLength, Length, IsISO31661Alpha2, IsOptional, IsEnum } from 'class-validator';

export class UsersDTO {
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    apellido: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(5, 20)
    password: string;
 
    role: string;
   
    google: Boolean;  

}
