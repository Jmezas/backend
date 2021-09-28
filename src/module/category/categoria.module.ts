import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { categoriaSchema } from './schema/category';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';

@Global()
@Module({
    imports: [MongooseModule.forFeature([{ name: 'category', schema: categoriaSchema }])],
    providers: [CategoriaService],
    controllers: [CategoriaController],
    exports: [CategoriaService]

})
export class CategoriaModule { }