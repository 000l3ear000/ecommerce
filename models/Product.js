import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    q:{
        type:String,
        required:true
    },
    category:{
        type: String,
        required: true
    },
    manufacturer:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    sku:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        default: 0,
        required: true
    },
    
},{
    timestamps: true
})



export default mongoose.models.Product || mongoose.model("Product", productSchema)

// const newProduct = new Product({
//     name: 'BioAmla',
//     category: 'shampoo',
//     manufacturer: 'Amla Products',
//     quantity: 21,
//     sku: '2323_123123_12321'
// }).save()