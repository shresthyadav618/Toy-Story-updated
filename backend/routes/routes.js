
const express = require('express');
const router = express.Router();
const signUpUser = require('../controller/signupuser');
const loginUser = require('../controller/loginUser');
const addReview = require('../controller/addReview');
const addFav = require('../controller/addfav');
router.post('/signup',(req,res)=>{signUpUser(req,res)});

router.post('/login',(req,res)=>{loginUser(req,res)});
router.post('/review',(req,res)=>{addReview(req,res)});
router.post('/fav',(req,res)=>{addFav(req,res)});
module.exports = router;