const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const productCartSchema = new mongoose.Schema({
    product:{
        type: ObjectId,
        ref: "product"
    },
    name: String,
    count: Number,
    price: Number

});

const orderSchema = new mongoose.Schema(
    {
        products: [productCartSchema],
        transaction_id: {},
        amount: {type:Number},
        address: String,
        updated: date,
        user:{
            type: ObjectId,
            ref: "user"
        },
        
    },
    {timestamps: true}
) ;

const Order= mongoose.model("Order", orderSchema);
module.exports={Order, productSchema}