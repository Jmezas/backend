import { Schema } from 'mongoose';

export const categoriaSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'La nombre es obligatoria']
    },  
   
    
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    active: {
        type: Boolean,
        default: true,
    },

});

 