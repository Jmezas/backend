import { Document } from 'mongoose'
export interface Order extends Document  {
    title:string
    product:Object
    cliente:Object
    total:number
}
