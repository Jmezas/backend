import { Schema } from 'mongoose';


export const Userchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es necesario']
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        maxlength: 50,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        select: false,
        trim: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER',
        enum: {
            values: ['ADMIN', 'CREATOR', 'USER'],
            message: 'Invalid type user',
        },
    }, 
    google: {
        type: Boolean,
        default: false
    },
    uuid: {
        type: String,
        required: true,
    }, 
    verifiedEmail: {
        type: Boolean,
        default: false,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
})