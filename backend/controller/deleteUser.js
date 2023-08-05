


const userModel = require('../modals/user');

const jwt_secret = process.env.SECRET;
const jwt = require('jsonwebtoken');

const deleteUser = (req,res)=>{
    console.log('inside the delete request');
const {token } = req.body;

const decoded = jwt.verify(token,jwt_secret);
userModel.findById(decoded._id).then((result)=>{
if(result){
userModel.deleteOne({_id : decoded._id}).then((resu)=>{
console.log('deleted the user with details',resu);
res.status(200).json(resu);
}).catch((err)=>{
    console.log('some error deleting the user',err);
    res.status(404).json({error : err});
})
}else{
console.log('no user found');
res.status(404).json({error : 'no user is found'})
}
}).catch((err)=>{
    console.log('some error ',err);
    res.status(404).json({error : 'some error'})
})
}

module.exports = deleteUser;