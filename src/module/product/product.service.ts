import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { product } from './interface/product.interface';
import { productDTO } from './DTO/product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel('product') private productModel: Model<product>) { }

    //estraer todo la data 
    async getproduct(query?): Promise<product[]> {
        const { limit, skip, options } = query;
        return await this.productModel.find({options})
        .limit(Number(limit) > 100 ? 100 : Number(limit))
        .skip(Math.abs(Number(skip)) || 0)
        .populate('category','name url')
    }
    //contar el numero de registro
    async countproduct(query?) {
        const { options } = query;
        return await this.productModel.countDocuments(options);
    }

    async getproductOne(query): Promise<product> {

        return await this.productModel.findOne(query)
    }

    //crear nueva product
    async createproduct(product: productDTO): Promise<product> {
        const productDB = await new this.productModel(product)
        return await productDB.save();
    }

    //actulizar product
    async Updateproduct(query, update): Promise<product> {
        return await this.productModel.findByIdAndUpdate(query, update, { new: true, runValidators: true, context: 'query' });

    }

    //elimiar product
    async deleteproduct(id: string): Promise<product> {
        return await this.productModel.findByIdAndUpdate({ _id: id }, { active: false }, { new: true, runValidators: true, context: 'query' })
    }
}
