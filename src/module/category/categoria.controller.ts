import { Controller, Get, Query, Param, Post, Body, Delete, Put, Req, NotFoundException, UseFilters, } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Category } from './interfaces/category.interface';
import { MatchQueryPipe } from '../../common/pipes/match-query.pipe';
import { ValidateObjectIdPipe } from '../../common/pipes/validate-object-id.pipe';
import { CategoryDTO } from './DTO/category.DTO';
import { MongoErrorFilter } from '../../common/filters/mongo-error.filter';
import { ValidationErrorFilter } from '../../common/filters/validation-error.filter';

@Controller('category')
export class CategoriaController {
    constructor(private categoryAPI: CategoriaService) { }

    @Get()
    async getCategory(@Query(new MatchQueryPipe([''])) query): Promise<{ category: Category[], total: number }> {
        const category = await this.categoryAPI.getCategory(query)
        const total = await this.categoryAPI.countCategory(query);
        return { category, total };
    }
    @Get(':id')
    async getCategoryOne(@Param('id', new ValidateObjectIdPipe()) categoryId: string, @Req() req): Promise<Category> {
      
        const category = await this.categoryAPI.getCategoryOne({ _id: categoryId})
  
        if (!category) { throw new NotFoundException('category not found', '1001') }
        return category;
    }

    @Post()  
    async createCategory(@Body() category: CategoryDTO): Promise<Category> {
        console.log(category)
        return await this.categoryAPI.createCategory(category)
    }

    @Put(':id')
    async UpdateCategory(@Param('id', new ValidateObjectIdPipe()) categoryId, @Body() category: CategoryDTO): Promise<Category> {
        const categoryDB = await this.categoryAPI.getCategoryOne({ _id: categoryId, active: true });
        if (!categoryDB) { throw new NotFoundException('categoria no found', '5001') }
        return await this.categoryAPI.UpdateCategory(category, categoryId);

    }
    @Delete(':id')
    async deleteCategory(@Param('id', new ValidateObjectIdPipe()) cateogryId): Promise<Category> {
        return await this.categoryAPI.deleteCategory(cateogryId)
    }  
}
