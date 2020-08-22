var mongoose = require('mongoose');
const {ObjectId} =mongoose.Schema;

var productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            trim: true,
            required: true,
            maxlength: 32

        },
        description:{
            type: String,
            required: true,
            maxlength: 2000
        
        },
        category:{
            type: ObjectId,
            ref: "Category",
            required: true
        },
        price:{
            type: Number,
            required: true,
            trim: true,
            maxlength: 32
        },
        stock:{
            type: Array,
            default: [],
            trim: true
        },
        sold:{
            type: Number,
            default: 0
        },
        photo:{
            data: Buffer,
            contenttype: String
        }
       
    },
     {timestamps: true},
    
) 
module.exports = mongoose.model("Product",productSchema);