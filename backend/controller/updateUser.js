

const userModel = require('../modals/user');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.SECRET;
const updateUser = (req,res)=>{

const {name,email,image,token} = req.body;


console.log('inside the update user block , the image is : ',image);
const decoded = jwt.verify(token,jwt_secret);
console.log(decoded._id);
userModel.findById(decoded._id).then((result)=>{
    console.log('got the user data successfully');

   result.updateOne({
    name : name,
    email : email,
    image : image
   }).then((result)=>{
    console.log('updated the user',result);
    res.status(200).json(result);
   }).catch((err)=>{
    console.log('some error updating');
    res.status(404).json({error : err});
   })
}).catch((err)=>{
    console.log('error finding the user');
    res.status(404).json({error : 'some error getting the user ',err});
})


}

module.exports = updateUser;