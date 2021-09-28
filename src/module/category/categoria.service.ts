import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './interfaces/category.interface';
import { CategoryDTO } from './DTO/category.DTO';


@Injectable()
export class CategoriaService {
    constructor(@InjectModel('category') private categoryModel: Model<Category>) { }

    //estraer todo la data 
    async getCategory(query?): Promise<Category[]> {
        const { limit, skip, options } = query;
        return await this.categoryModel.find(options);
    }
    //contar el numero de registro
    async countCategory(query?) {
        const { options } = query;
        return await this.categoryModel.countDocuments(options);
    }

    async getCategoryOne(query):Promise<Category>{
        
        return await this.categoryModel.findOne(query)
    }

    //crear nueva categoria
    async createCategory(category: CategoryDTO): Promise<Category> { 
        const categoryDB = await new this.categoryModel(category)
        return await categoryDB.save();
    }

    //actulizar categoria
    async UpdateCategory(query, update): Promise<Category> {
        return await this.categoryModel.findByIdAndUpdate(query, update,{ new: true, runValidators: true, context: 'query' });

    }

    //elimiar categoria
    async deleteCategory(id:string):Promise<Category>{
        return await this.categoryModel.findByIdAndUpdate({_id:id},{active: false},{ new: true, runValidators: true, context: 'query' })
    }

}
