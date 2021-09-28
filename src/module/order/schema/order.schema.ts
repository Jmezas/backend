import { Schema } from 'mongoose';
export const Orderschema = new Schema({
    
    title: {
        type: String,
        required: true
    },
    product: {
        type: Object,
        required: true
    },
    cliente: {
        type: Object,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        default: true,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    orden: {
        type: Number
    },
})