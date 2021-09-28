import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as underscore from 'underscore';

@Injectable()
export class PickPipe implements PipeTransform {
  constructor(private keys: any[]) {}
  transform(value: any, metadata: ArgumentMetadata) {
    return underscore.pick(value, this.keys);
  }
}
