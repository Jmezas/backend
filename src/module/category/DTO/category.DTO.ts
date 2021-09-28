import { IsNotEmpty, IsString, MaxLength, IsEmail, MinLength, Length, IsISO31661Alpha2, IsOptional, IsEnum } from 'class-validator';

export class CategoryDTO{

    @IsNotEmpty()
    @IsString() 
    @MinLength(5, {
        message: 'El título es demasiado corto',
      })
    name:string;
  
    @IsNotEmpty()
    @IsString()
    usuario:string;
}
