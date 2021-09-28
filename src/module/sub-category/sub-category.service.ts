import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { subCategory } from './interface/subCategory.Interface';
import { subCategoryDTO } from './DTO/subCategory.dto';

@Injectable()
export class SubCategoryService {
    constructor(@InjectModel('Sub_category') private subCategoryModel: Model<subCategory>) { }


    //estraer todo la data 
    async getSubCategory(query): Promise<subCategory[]> {
         
        return await this.subCategoryModel.find(query)
        .populate('category','name')
    
    }
    //contar el numero de registro
    async countSubCategory(query) { 
        return await this.subCategoryModel.countDocuments(query);
    }

    async getSubCategoryOne(query): Promise<subCategory> { 
        return await this.subCategoryModel.findOne(query)
    }

    //crear nueva sub_categoria
    async createSubCategory(category: subCategoryDTO): Promise<subCategory> {
        const categoryDB = await new this.subCategoryModel(category)
        return await categoryDB.save();
    }

    //actulizar sub_categoria
    async UpdateSubCategory(query, update): Promise<subCategory> {
        return await this.subCategoryModel.findByIdAndUpdate(query, update, { new: true, runValidators: true, context: 'query' });

    }

    //elimiar sub_categoria
    async deleteSubCategory(id: string): Promise<subCategory> {
        return await this.subCategoryModel.findByIdAndUpdate({ _id: id }, { active: false }, { new: true, runValidators: true, context: 'query' })
    }
}
