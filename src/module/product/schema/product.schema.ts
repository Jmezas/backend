import { Schema } from 'mongoose';
export const productSchema = new Schema({
  
    title: {
        type: String,
        required: true
    },
      
    description: {
        type: String,
        required: String
    },
    brand: {
        type: String,
        required: true
    },
    collections: {
        type: Object,
        required: false
    },

    category: [{
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    }],

    price: {
        type: Number,
        required: [true, 'El precio únitario es necesario']
    },
    discount: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    images: {
        type: Object,
        required: false
    }, 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
   
    
})