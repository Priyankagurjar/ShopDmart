const express = require("express");
const router = express.Router();

const {
    getProductById,
    craeteProduct,
    getProduct,
    photo,
    updateProduct,
    deleteProduct,
    getAllProduct,


} = require("../controllers/product");

const{
    isSignedIn,
    isAdmin,
    IsAuthenticated
} = require("../controllers/auth");


const{
    getUserById
} = require("../controllers/user")

//craete productroute
router.post(
    "/product/craete/:userId"
    
    )

