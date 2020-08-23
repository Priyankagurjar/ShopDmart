const User = require("../models/user");
const user = require("../models/user");

exports.getUserById = (req,res,next,id) =>{
    User.findById(id).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error:" No user was  found in DB"
            });
        }
        req.profile = user;
        next();
    })
}

//get the user
exports.getUser = (req,res) => {
    //will comeback here
     req.profile.salt = undefined;
     req.profile.encry_password = undefined;
     return res.json(req.profile)
}
///update user

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set: req.body},
        {new: true, userFindAndModify: false},
        (err , user) => {
            if(err){
                return res.status(400).json({
                    error: "You are not authorized to update this user"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            return res.json(req.profile)
        }   
        )
}


///get all user
exports.getAllusers = (req,res) => {
    User.find().exec((err,users) => {
        if(err || !users){
            return res.status(400).json({
                err: "no user found"
            })
  
        }
        res.json(users);
    })
}