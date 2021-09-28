import { Controller, Get, Query, Param, Req, UnauthorizedException, NotFoundException, Post, Body, ConflictException, Put, Delete, UseGuards } from '@nestjs/common';
import { MatchQueryPipe } from 'src/common/pipes/match-query.pipe';
import { ValidateObjectIdPipe } from 'src/common/pipes/validate-object-id.pipe';
import { User } from './interface/users.interface';
import { UsersService } from './users.service';
import { UuidPipe } from '../../common/pipes/uuid.pipe';
import { PasswordEncryptPipe } from '../../common/pipes/password-encrypt.pipe';
import { PickPipe } from '../../common/pipes/pick.pipe';
import { UsersDTO } from './DTO/users.dto';
import { AuthGuard } from '../../common/guard/auth.guard';
import { RoleGuard } from '../../common/guard/role.guard';

@Controller('users')
export class UsersController {
    constructor(private userAPI: UsersService) { }

    @Get()
  //  @UseGuards(AuthGuard)
    async getUsers(@Query(new MatchQueryPipe(['nombre'])) query): Promise<{ users: User[], total: number }> {
    
        const users = await this.userAPI.getUsers(query);
        
        const total = await this.userAPI.countUsers(query);
        return { users, total };
    }

    @Get(':id')
    async getUser(@Param('id', new ValidateObjectIdPipe()) userID: string, @Req() req): Promise<User> {


        const user = await this.userAPI.getUser({ _id: userID, active: true });
        if (!user) { throw new NotFoundException('User not found', '1001'); }
        return user;
    }

    @Post()
    async createUser(@Body(new UuidPipe(), new PasswordEncryptPipe(),
        new PickPipe(['nombre','apellido','email', 'password', 'uuid','google'])) user: UsersDTO): Promise<User> {
        console.log(user);

        const existUser = await this.userAPI.getUser({ email: user.email });
        if (existUser) { throw new ConflictException('This user already exist', '1002'); }
        const userDB = await this.userAPI.createUser(user);

        return userDB;
    }

    @Put(':id')
    async updateUser(@Param('id', new ValidateObjectIdPipe()) userID: string,
        @Body(new PickPipe(['nombre','country',   'role'])) user: UsersDTO, @Req() req): Promise<User> {

        const userDB = await this.userAPI.getUser({ _id: userID, active: true });
        if (!userDB) { throw new NotFoundException('User not found', '1001'); }
  
        return await this.userAPI.updateUser({ _id: userID, active: true }, user);
    }

    @Delete(':id') 
    async deleteUser(@Param('id', new ValidateObjectIdPipe()) userID, @Req() req): Promise<User> {
      

        const userDB = await this.userAPI.getUser({ _id: userID, active: true });
        if (!userDB) { throw new NotFoundException('User not found', '1001'); }
 
        userDB.active = false;
        return await userDB.save();
    }

}
