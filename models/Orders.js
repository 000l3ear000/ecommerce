import mongoose from 'mongoose';

const ordersSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    orders:{
        type: Object,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    }
},{
    timestamps: true
})



export default mongoose.models.Orders || mongoose.model("Orders", ordersSchema)

// const newProduct = new Product({
//     name: 'BioAmla',
//     category: 'shampoo',
//     manufacturer: 'Amla Products',
//     quantity: 21,
//     sku: '2323_123123_12321'
// }).save()