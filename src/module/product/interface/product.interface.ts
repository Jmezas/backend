import { Document } from 'mongoose'

export interface product extends Document {

    title: string;
    description: string;
    brand: string;
    collections: object; 
  
    category: string;
    price: Number;
    discount: Number;
    stock: Number;
    tags: String[];
    images: Object; 
    usuario: string; 
}