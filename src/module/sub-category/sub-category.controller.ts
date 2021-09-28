import { Controller, Delete, Get, Param, Post, Put, Query, NotFoundException, Req, Body } from '@nestjs/common';
import { MatchQueryPipe } from 'src/common/pipes/match-query.pipe';
import { ValidateObjectIdPipe } from 'src/common/pipes/validate-object-id.pipe';
import { SubCategoryService } from './sub-category.service';
import { subCategory } from './interface/subCategory.Interface';
import { subCategoryDTO } from './DTO/subCategory.dto';

@Controller('sub-category')
export class SubCategoryController {
    constructor(private subAPI: SubCategoryService) { }

    @Get()
    async getCategory(@Query(new MatchQueryPipe(['Category', 'Title_list'])) query): Promise<{ subcategory: subCategory[], total: number }> {

        if (!query.title_list) {
            const subcategory = await this.subAPI.getSubCategory({ category: query.category })
            const total = await this.subAPI.countSubCategory({ category: query.category });
            return { subcategory, total };
        }
        if (!query.category) {

            const subcategory = await this.subAPI.getSubCategory({ title_list: query.title_list })
            const total = await this.subAPI.countSubCategory({ title_list: query.title_list });
            return { subcategory, total };

        }


    }

    @Get(':id')
    async getCategoryOne(@Param('id', new ValidateObjectIdPipe()) categoryId: string, @Req() req): Promise<subCategory> {

        const category = await this.subAPI.getSubCategoryOne({ _id: categoryId })

        if (!category) { throw new NotFoundException('category not found', '1001') }
        return category;
    }

    @Post()
    async createCategory(@Body() category: subCategoryDTO): Promise<subCategory> {
        return await this.subAPI.createSubCategory(category)
    }

    @Put(':id')
    async UpdateCategory(@Param('id', new ValidateObjectIdPipe()) categoryId, @Body() category: subCategoryDTO): Promise<subCategory> {
        const categoryDB = await this.subAPI.getSubCategoryOne({ _id: categoryId, active: true });
        if (!categoryDB) { throw new NotFoundException('categoria no found', '5001') }
        return await this.subAPI.UpdateSubCategory(category, categoryId);

    }
    @Delete(':id')
    async deleteCategory(@Param('id', new ValidateObjectIdPipe()) cateogryId): Promise<subCategory> {
        return await this.subAPI.deleteSubCategory(cateogryId)
    }
}
