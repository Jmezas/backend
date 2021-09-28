import { Document } from 'mongoose';
export interface subCategory extends Document {
    category:String[]
    user:string
    name:string
    url:string
    image:string
    products_inventory:Number
    view:Number
    title_list:string
}