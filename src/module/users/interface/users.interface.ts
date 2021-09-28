import { Document } from 'mongoose'
export interface User extends Document {
    nombre: string;
    verifiedEmail: boolean;
    email: string;
    password: string;
    active: boolean;
    img: string;
    role: string; 
    google: Boolean;
    uuid: string;
    country: string;
    createdOn: Date;
    apellido:string;
}