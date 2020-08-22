const User = require("../models/user");
const { response } = require("express");
var jwt = require('jsonwebtoken');
var expressjwt = require('express-jwt');
const { validationResult } = require("express-validator");

// exports.usercreate =  (req,res) => {
//     console.log("API RUN");
//         let body = req.body;
//         console.log(body)
//         let users = new User(body);
//         // console.log("hy")
//         users.save().then((users) => {
//         // console.log("hy")

//         res.send({
            
//         // category,
//         notice: 'successfully created the user'
//         })
//         // console.log("llkokl")

//         }).catch((err) => {
//         res.send(err);
//         });
//         };

exports.signup = (req, res) => {

    //finds the validation errors in this request

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            errors: errors.array()[0].msg});

    }

    //database keys
    
    const user = new User(req.body)
    user.save((err, user) => {

        if(err){
            return res.status(400).json({
                err: "NOT able to save user in database"
            })
        }
        res.json({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            contact: user.contact,
            encry_password: user.encry_password
        });
    })
};

// exports signin 
exports.signin= (req,res) => {
    const { email, encry_password} = req.body;
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(422).json({
            errors: errors.array()[0].msg});

    }
    User.findOne({email}, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                error : "user email does not exist"
            })
        }
        if(user.authenticate(encry_password)){
            return res.status(401).json({
                error: "email and password does not match"
            })
        }

        //create token

        const token = jwt.sign({_id: user._id}, process.env.SECRET);
        //put token in cookie
        res.cookie("token",token, {expire: new Date()+ 9999});

        //send response to front end
        const{_id, firstname, lastname, email}= user;
        res.json({token , user:{_id, firstname, lastname, email }});
    });
};

//exports the signout
exports.signout= (req,res) => {
    res.clearCookie("token")
    res.json({
        message: "user signout"

    });
};
//protected routes
exports.isSignedIn = expressjwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});

//custemmiddlwares

exports.isAuthenticated=(req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id === req.auth._id;
    if(!checker){
        return res.status(403).json({
            error: "Access senied"
        })
    }
    
    next();
}

exports.isAdmin = (req ,res , next)=> {
    if(req.profile.role===0){
        return res.status(403).json({
         error: "vvvv"
        })
    }

    if(req.profile.role === 0){
            return res.status(403).json({
           message: "vvvv"
        })
    }

    next();
}