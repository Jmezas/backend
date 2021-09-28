import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Userchema } from './schema/users.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Global()
@Module({
    imports: [MongooseModule.forFeature([{ name: 'user', schema: Userchema }])],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService]
})
export class UsersModule {}
