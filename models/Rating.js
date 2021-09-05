import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
    productId:{
        type: String,
        required: true
    },
    comments: {
        type: Array,
        required: true
    },
    rating:{
        type: Number,
        default: 0,
        required: true
    },
    purchased:{
        type: Number,
        default:0,
        required:true
    }
},{
    timestamps: true
})



export default mongoose.models.Rating || mongoose.model("Rating", ratingSchema)

// const newProduct = new Product({
//     name: 'BioAmla',
//     category: 'shampoo',
//     manufacturer: 'Amla Products',
//     quantity: 21,
//     sku: '2323_123123_12321'
// }).save()