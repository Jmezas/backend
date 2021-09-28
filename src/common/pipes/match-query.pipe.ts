import { Injectable, PipeTransform } from '@nestjs/common'
import * as _ from 'underscore'

@Injectable()
export class MatchQueryPipe implements PipeTransform {
    constructor(private keys: string[]) { }
    transform(value: any) { 
        if (!value.hasOwnProperty('options')) { 
            Object.assign(value, { options: { active: !value.active ? true : value.active === 'true' ? true : false } })
        }else { 
            _.assign(value.options, { active: !value.active ? true : value.active === 'true' ? true : false });
        }

        this.keys.forEach(key=>{
            if (value[key]){
                value.options[key] = new RegExp(value[key].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            }
        });
        return value;
    }
}