const User = require('../models/user');
const { response } = require("express");
var jwt = require('jsonwebtoken');
var expressjwt = require('express-jwt');
const { validationResult } = require('express-validator');
const { DocumentProvider } = require('mongoose');


  //post controller functions

exports.signup = (req , res) => {

    //finds the validation errors in this request

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
          errors: errors.array()[0].msg });
    }




    //databse keys
    const user = new User(req.body)
    user.save((err,user) => {
        if(err){
            return res.status(400).json({
                err: "not able to save in db"
            })
        }
        
 res.json({ 
            firstname: user.firstname,
            lastname: user.lastname,
            email : user.email,
            contact : user.contact,
            encry_password : user.encry_password
    
        });
       
    })
};


//exort signin
exports.signin = (req, res) =>{
    const {email,encry_password} = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      return res.status(400).json({ 
          errors: errors.array()[0].msg });
    }


    User.findOne({email},(err, user) =>{
        if (err || !user){
            return res.status(400).json({
                error : "user email does not exists"
            })
        }
        if(user.authenticate(encry_password)){
         return  res.status(401).json({
            error : "Email and password does not match"
        })
        }
            
        //create token
          
        const token = jwt.sign({_id: user._id}, process.env.SECRET);

        //put token in cookie

       res.cookie("token",token,{expire: new Date()+ 9999})

        //send response to front end
        const { _id, name, email, role } = user;
        return res.json({ token,user: {_id, name, email, role} });
    });
};


//export the signout
exports.signout = (req , res) => {
    res.clearCookie("token");
    res.json({
        message: "USER SIGNOUT SUCCESS"

    });
}; 

//protected routes
exports.isSignedIn = expressjwt({

    secret: process.env.SECRET,
    userPoperty : "auth"
}); 
//custom middlewares

exports.isAuthenticated = (req, res, next) => {
    let checker = req.profle && req.auth && req.profile.id === req.auth._id;
    if(!checker){
        return res.status(403).json({
            error: "access denide"
        })
    }
    next();
}

exports.isAdmin = (req, res, next) => {


    if (req.profile.role === 0){
        return res.status(403).json({
            message: "you r not"
        })

    }


    if (req.profile.role === 1){
 
        return res.status(200).json({
            message: "come in sir"
        })
 
        next();
 
 
 
    }
    }

    
  

