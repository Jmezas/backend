import { Injectable, PipeTransform } from '@nestjs/common';
import * as uuid from 'uuid';

@Injectable()
export class UuidPipe implements PipeTransform {
  transform(value: any) {
    value.uuid = uuid.v4();
    return value;
  }
}
