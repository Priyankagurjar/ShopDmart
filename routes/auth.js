var express = require('express');
var router = express.Router();
const { check,validationResult } = require('express-validator');
const {signout, signup, signin, isSignedIn} = require("../controllers/auth");

router.post("/signup",[
    //express validation code
    check("firstname", "name should be atleast 3 char").isLength({ min: 3 }),
    check("email", "email should be atleast 3 char").isLength({ min:3 }),
    
],
 signup
);


router.post("/signin",
[
    //signin checking
    check("email", "email is required").isEmail(),
    check("encry_password", "password fields is required").isLength({min: 1})

],
 signin
);


router.get("/signout", signout);

router.get("/testroute",isSignedIn, (req,res) => {
    res.send("a protected user");
})

module.exports = router;