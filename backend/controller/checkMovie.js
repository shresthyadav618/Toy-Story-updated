




const favModal = require('../modals/fav');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.SECRET;
const addFav = (req,res)=>{

const {movieId , token} = req.body;
const decoded = jwt.verify(token,jwt_secret);
const userId = decoded._id;
favModal.findOne({userId,movieId}).then((result)=>{
    if(result){
        res.status(200).json({status : 'Movie already exists'});
    }else{
        
        res.status(404).json({error : 'unable to find the movie (not present)'});
        
    }
})


}

module.exports = addFav;