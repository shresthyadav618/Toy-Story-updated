


const favModal = require('../modals/fav');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.SECRET;
const getFavMovieByToken = (req,res)=>{
const {token} = req.body;
const decoded = jwt.verify(token,jwt_secret);
const id = decoded._id;
favModal.find({userId : id}).then((result)=>{
    console.log('got the data ',result);
res.status(200).json(result);
}).catch((err)=>{
res.status(404).json({error : 'some error getting the fav movies',err});
})

}

module.exports = getFavMovieByToken;