

const userModal = require('../modals/user');

const getuserByToken = (req,res)=>{
    const {token} =req.body;  
    console.log('inside the get all users request');
    userModal.find({token}).then((result)=>{
        console.log('got the user with details ',result);
        res.status(200).json(result);
    }).catch((err)=>{
        console.log('there was some error getting the user information ');
        res.status(404).json({error : 'some error getting the info',err})
    })

}

module.exports = getuserByToken;