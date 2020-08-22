var Mongoose  = require("mongoose");

var categorySchema = new Mongoose.Schema(
    {
        name:{
            type: String,
            trim: true,
            required: true;
            maxlength: 32,
            unique: true
        },
        
    },
    {timestamps: true},
);
module.exports = Mongoose.model("Category",categorySchema);
