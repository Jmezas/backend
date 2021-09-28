import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './interface/order.interface';

@Injectable()
export class OrderService {
  constructor(@InjectModel('order') private OrderModel: Model<Order>) { }


  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const orderDB = await new this.OrderModel(createOrderDto)
    return await orderDB.save();
  }

  async findAll(query?): Promise<Order[]> {
    console.log(query)
    const { limit, skip, options } = query;
    return await this.OrderModel.find(options)
      .limit(Number(limit) > 100 ? 100 : Number(limit))
      .skip(Math.abs(Number(skip)) || 0);
  }

  async findOne(query): Promise<Order> {
    return await this.OrderModel.findOne(query);
  }
  async countOrders(query?) {
    const { options } = query;
    return await this.OrderModel.countDocuments(options);
  }

  async updateOrder(query, update): Promise<Order> {
    return await this.OrderModel.findOneAndUpdate(query, update, { new: true, runValidators: true, context: 'query' });
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

}
