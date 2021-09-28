import { IsNotEmpty, IsString,   } from 'class-validator';
export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    product:Object;

    @IsNotEmpty()
    cliente:Object;

    total:Number
    orden:Number
}
