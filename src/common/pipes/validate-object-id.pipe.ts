import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class ValidateObjectIdPipe implements PipeTransform {
  constructor(private keys?: string[]) {}
  transform(values: string) {
    const errors = [];
    if (this.keys) {
      this.keys.forEach(key => {
        if (values[key]) {
          if (Array.isArray(values[key])) {
            values[key].forEach(value => !mongoose.Types.ObjectId.isValid(value) ? errors.push(key) : '');
            // tslint:disable-next-line:no-unused-expression
          } else { !mongoose.Types.ObjectId.isValid(values[key]) ? errors.push(key) : ''; }
        }
      });
    } else {
      // tslint:disable-next-line:no-unused-expression
      !mongoose.Types.ObjectId.isValid(values) ? errors.push(values) : '';
    }

    if (errors.length > 0) { throw new BadRequestException(`Invalid ID for: ${ errors.join(',') }`);    }
    return values;
  }
}
