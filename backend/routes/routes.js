
const express = require('express');
const router = express.Router();
const signUpUser = require('../controller/signupuser');
const loginUser = require('../controller/loginUser');
const addReview = require('../controller/addReview');
const addFav = require('../controller/addfav');
const getFavMovieByToken = require('../controller/getFavMovieByToken');
const getuserByToken = require('../controller/getUserbyToken');
const updatePass = require('../controller/updatePass');
const updateUser = require('../controller/updateUser');
router.post('/signup',(req,res)=>{signUpUser(req,res)});

router.post('/login',(req,res)=>{loginUser(req,res)});
router.post('/review',(req,res)=>{addReview(req,res)});
router.post('/fav',(req,res)=>{addFav(req,res)});
router.post('/userbyid',(req,res)=>{getuserByToken(req,res)});
router.post('/favbyid',(req,res)=>{getFavMovieByToken(req,res)});
router.put('/user/pwd',(req,res)=>{updatePass(req,res)});
router.put('/user',(req,res)=>{updateUser(req,res)});

module.exports = router;