import { IsNotEmpty, Length, IsString, IsNumber } from 'class-validator';

export class subCategoryDTO{
    @IsNotEmpty()
    @IsString()
    category:String[]

    @IsNotEmpty()
    @IsString()
    user:String[]


    @IsNotEmpty()
    @IsString()
    title_list:string

    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsString()
    url:string

    @IsNotEmpty()
    @IsString()
    image:string

    @IsNotEmpty()
    @IsNumber()
    products_inventory:string

    @IsNotEmpty()
    @IsNumber()
    view :Number

}