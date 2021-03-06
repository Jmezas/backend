import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class LoginUserDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
