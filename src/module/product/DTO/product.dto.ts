import { IsNotEmpty, IsString, MaxLength, IsEmail, MinLength, Length, IsISO31661Alpha2, 
    IsOptional, IsEnum, IsObject, IsArray, IsNumber, IsBoolean } from 'class-validator';


export class productDTO {
   
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    brand:string;

    @IsNotEmpty()
    @IsString()
    collection:object;

 
    @IsNotEmpty()
    @IsString()
    category: Document[];

    @IsNotEmpty()
    @IsNumber()
    price: Number;

    @IsNotEmpty()
    @IsNumber()
    discount:Number;

    @IsNotEmpty()
    @IsNumber()
    stock:Number;

    @IsNotEmpty()
    @IsArray()
    tags: String[]; 

     
    images: Object; 
    
    @IsNotEmpty()
    @IsString()
    usuario: string; 
    
}