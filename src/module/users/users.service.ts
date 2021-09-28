import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/users.interface';
import { UsersDTO } from './DTO/users.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel('user') private UserModel: Model<User>) {}

    async getUsers(query?): Promise<User[]> {
        const { limit, skip, options } = query;
        console.log(limit, skip, options)

        return await this.UserModel.find(options)
        .limit(Number(limit) > 100 ? 100 : Number(limit))
        .skip(Math.abs(Number(skip)) || 0);
    }

    async countUsers(query?) {
        const { options } = query;
        return await this.UserModel.countDocuments(options);
    }

    async getUser(query): Promise<User> {
        return await this.UserModel.findOne(query);
    }

    async getFullUser(query): Promise<User> {
        return await this.UserModel.findOne(query).select('+password');
    }

    async createUser(user: UsersDTO): Promise<User> {
        const userDB = await new this.UserModel(user);
        return await userDB.save();
    }

    async updateUser(query, update): Promise<User> {
        return await this.UserModel.findOneAndUpdate(query, update, { new: true, runValidators: true, context: 'query' });
    }

    async deleteUser(ID: string): Promise<User> {
        return await this.UserModel.findOneAndUpdate({ _id: ID }, { active: false }, { new: true, runValidators: true, context: 'query' });
    }

    // *Servicio que actualiza el campo del usuario, para confirmar el correo
    async ActiviUser(ID: string) {
        return await this.UserModel.findOneAndUpdate({_id: ID},{ verifiedEmail: true})
    }
}
