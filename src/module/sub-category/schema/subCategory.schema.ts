import { Schema } from 'mongoose';

export const subCategorySchema= new  Schema({
    category: ({
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    }),
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    title_list: {
        type: String,
        required: [true, 'La titulo es obligatoria']
    },
    name: {
        type: String,
        unique: true,
        required: [true, 'El nombre es obligatorio']
    },
    url: {
        type: String,
        required: [true, 'La URL es obligatorio']
    },
    image: {
        type: String,
        required: [true, 'La imagen es obligatorio']
    },
    products_inventory: {
        type: Number,
        required: [true, 'stock']
    },
    view: {
        type: Number
    },
})