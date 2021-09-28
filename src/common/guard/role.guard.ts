import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../../module/users/interface/users.interface';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private roles: string[]) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.token.user as User;
    if (this.roles.indexOf(token.role) === -1) {
      throw new UnauthorizedException('insufficient permissions', '0007');
    }
    return true;
  }
}
