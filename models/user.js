var mongoose =require ('mongoose');
const crypto = require('crypto');
const uuidv1= require("uuid/v1") 
 var userSchema = new mongoose.Schema(
    {
        firstname:{
            type: String,
            required: true,
            maxlength: 20,
            trim: true 
        },
        lastname:{
            type: String,
            required: true,
            maxlength: 30,
            trim: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        contact:{
            type: String,
            required: true,
            trim: true
        },
        encry_password: {
            required:true,
            type: String,
    

        },
        userinfo:{
            type: String,
            trim: true
        },

        purchases: {
            type: Array,
            default: [],
            trim: true,   
        },
        salt: String,
        
        role:{
            type: Number,
            default:0
        },
       
    },
    {timestamps: true},
 );

 userSchema.virtual("password")
 .get(function(password){
     this._password= password;
     this.salt = uuidv1();
     this.encry_password = this.securePassword(password)
 })
 .get(function(){
     return this._password
 })


 userSchema.methods={
     authenticate: function(plainpassword){
         return this.securePassword(plainpassword) === this.encry_password;

     },


 
     securePassword: function(plainpassword){
         if(!plainpassword) return "";
         try{
             return  crypto
                           .createHmac('sha256', this.salt)
                           .update(plainpassword)
                           .digest('hex');
         }
         catch(err){
             return "";
         }
     }
 }

 module.exports= mongoose.model("User",userSchema);

//    const mongoose = new module.mongoose();
//     const productShcema = newproductSchema("product");
      