import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller'; 
import { subCategorySchema } from './schema/subCategory.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Sub_category', schema: subCategorySchema }])],
  providers: [SubCategoryService],
  controllers: [SubCategoryController],
  exports: [SubCategoryService]

})
export class SubCategoryModule {

}
