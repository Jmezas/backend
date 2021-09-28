import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../../module/auth/auth.service';
import { UsersService } from '../../module/users/users.service';
import * as mongoose from 'mongoose';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authAPI: AuthService, private userAPI: UsersService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const auth = request.get('Authorization'); 
    if (!auth) { return false; }
    const decoded = this.authAPI.verifyToken(auth);  
    const _id = (decoded as any).user._id; 
    if (mongoose.Types.ObjectId.isValid(_id)) {
      const userDB = await this.userAPI.getUser({ _id, active: true }); 
      if (userDB && userDB.verifiedEmail) {
        (decoded as any).user = userDB.toObject();
        request.token = decoded;
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
