import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriaModule } from './module/category/categoria.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategoryModule } from './module/sub-category/sub-category.module';
import { ProductModule } from './module/product/product.module';
import { UsersModule } from './module/users/users.module';
import { AuthModule } from './module/auth/auth.module';
import { OrderModule } from './module/order/order.module';

@Module({
  imports: [ConfigModule.forRoot(),
  MongooseModule.forRoot(process.env.DB_URI, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }),
    CategoriaModule,
    SubCategoryModule,
    ProductModule,
    UsersModule,
    AuthModule,
    OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
