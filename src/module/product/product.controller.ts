import { Controller, Query, Delete, Get, Post, Put, Param, Req, NotFoundException, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { MatchQueryPipe } from '../../common/pipes/match-query.pipe';
import { product } from './interface/product.interface';
import { ValidateObjectIdPipe } from '../../common/pipes/validate-object-id.pipe';
import { productDTO } from './DTO/product.dto';
const cloudinary =require('cloudinary')
//const cloudinary = require('cloudinary').v2


@Controller('product')
export class ProductController {
    constructor(private productAPI:ProductService){}

    @Get()
    async getproduct(@Query(new MatchQueryPipe([''])) query): Promise<{ product: product[], total: number }> {
        const product = await this.productAPI.getproduct(query)
        const total = await this.productAPI.countproduct(query);
        return { product, total };
    }
    @Get(':id')
    async getproductOne(@Param('id', new ValidateObjectIdPipe()) productId: string, @Req() req): Promise<product> {
      
        const product = await this.productAPI.getproductOne({ _id: productId})
  
        if (!product) { throw new NotFoundException('product not found', '1001') }
        return product;
    }

    @Post()
    async createproduct(@Body() product: productDTO): Promise<product> {
        cloudinary.config({
            cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
            api_key:process.env.CLOUDINARY_API_KEY,
            api_secret:process.env.CLOUDINARY_API_SECRET
        })

        console.log(process.env.CLOUDINARY_CLOUD_NAME) 
        console.log(process.env.CLOUDINARY_API_KEY) 
        console.log(process.env.CLOUDINARY_API_SECRET) 
       const result = await cloudinary.v2.uploader.upload('C:/Users/Jhaser/Desktop/tallerProyecto/imagenes/Aceites/aceiteCheffGalon.png') 
        console.log(result)
        return await this.productAPI.createproduct(product)
    }

    @Put(':id')
    async Updateproduct(@Param('id', new ValidateObjectIdPipe()) productId, @Body() product: productDTO): Promise<product> {
        const productDB = await this.productAPI.getproductOne({ _id: productId, active: true });
        if (!productDB) { throw new NotFoundException('categoria no found', '5001') }
        return await this.productAPI.Updateproduct(product, productId);

    }
    @Delete(':id')
    async deleteproduct(@Param('id', new ValidateObjectIdPipe()) cateogryId): Promise<product> {
        return await this.productAPI.deleteproduct(cateogryId)
    }  
}
