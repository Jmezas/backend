import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Orderschema } from './schema/order.schema';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: 'order', schema: Orderschema }])],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService]


})
export class OrderModule { }
