

const userModal = require('../modals/user');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.SECRET;
const getuserByToken = (req,res)=>{
    const {token} =req.body;  
    const decoded = jwt.verify(token,jwt_secret);
    console.log('inside the get all users request');
    
    userModal.findById(decoded._id).then((result)=>{
        // console.log('got the user with details ',result);
        res.status(200).json(result);
    }).catch((err)=>{
        console.log('there was some error getting the user information ');
        res.status(404).json({error : 'some error getting the info',err})
    })

}

module.exports = getuserByToken;