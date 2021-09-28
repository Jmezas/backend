import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { PickPipe } from '../../common/pipes/pick.pipe';
import { LoginUserDTO } from './DTO/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private userAPI: UsersService, private authAPI: AuthService) {}

    @Post('login')
    async login(@Body(new PickPipe(['email', 'password'])) user: LoginUserDTO) { 
        const userDB = await this.userAPI.getFullUser({ email: user.email, active: true });
        if (!userDB) { throw new UnauthorizedException('Invalid email or password', '0001'); }
     
        if (!this.authAPI.mathpassword(user.password, userDB.password)) {
            throw new UnauthorizedException('Invalid email or password or not enough permissions', '0001');
        }
        
       // if (!userDB.verifiedEmail) { throw new UnauthorizedException(`${ userDB._id.toString() }`, '0002'); } 
        return {auth: this.authAPI.getToken(userDB)};
    }

    @Post('loginUser')
    async loginUvu(@Body(new PickPipe(['email', 'password'])) user: LoginUserDTO) { 
        const userDB = await this.userAPI.getFullUser({ email: user.email, active: true });
        if (!userDB) { throw new UnauthorizedException('Invalid email or password', '0001'); }
        if(userDB.role === 'CREATOR'){
            throw new UnauthorizedException('Not enough permissions', '0001');
        }
        if (!this.authAPI.mathpassword(user.password, userDB.password)) {
            throw new UnauthorizedException('Invalid email or password or not enough permissions', '0001');
        }
        if (!userDB.verifiedEmail) { throw new UnauthorizedException(`${ userDB._id.toString() }`, '0002'); }

        return { auth: this.authAPI.getToken(userDB) };
    } 
}
