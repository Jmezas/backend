import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PasswordEncryptPipe implements PipeTransform {
  transform(value: any) {
    // const strongValidation = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

    if (!value.password) { throw new BadRequestException('Missing password'); }
    if (value.password.length < 8) { throw new BadRequestException('Minimun 8 characters', '8004'); }
    value.password = bcrypt.hashSync(value.password, 10);
    return value;
  }
}
