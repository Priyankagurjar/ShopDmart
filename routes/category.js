const express = require("express");
const router = express.Router();

const{
    getCategoryById,
    getCategory,
    getAllCategory,
    updateCategory,
    removecategory

} = require("../controllers/category");

const{
    isSignedIn,
    isAdmin,
    IsAuthenticated,
    isAuthenticated
} = require("../controllers/auth");

const{
    getUserById
} = require("../controllers/user");
const { route }= require('./user');

router.param("userId", getUserById);
router.param("categoryId", getCategoryById);


//create
router.post(
    "/category/create/userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createCategory
);

//read
router.get("category/:categoryId",getCategory);
router.get("category",getAllCategory);


//update
router.put(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAdmin,
    isAuthenticated,
    updateCategory
);