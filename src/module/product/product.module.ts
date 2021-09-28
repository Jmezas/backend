import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from './schema/product.schema';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Global()
@Module({
    imports: [MongooseModule.forFeature([{ name: 'product', schema: productSchema }])],
    providers: [ProductService],
    controllers: [ProductController],
    exports: [ProductService]
})
export class ProductModule { }
