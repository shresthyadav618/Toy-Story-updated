


const favModal = require('../modals/fav');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.SECRET;
const addFav = (req,res)=>{
console.log(req.body)
const {movieId , token} = req.body;
const decoded = jwt.verify(token,jwt_secret);
console.log('the token is :' , jwt_secret);
const userId = decoded._id;
console.log('the user id is : ',userId);
console.log('the movie id  is : ',movieId);
favModal.findOne({userId,movieId}).then((result)=>{
    if(result){
        res.status(404).json({error : 'Movie already exists'});
    }else{
        const newFav = favModal({
            movieId : movieId,
            userId : userId
        })
        
        newFav.save().then((result)=>{
            res.status(200).json(result);
        }).catch((err)=>{
            console.log('there was some error while adding the movie',err);
            res.status(404).json({error : 'there was some error while adding the movie you wanted'});
        })
    }
})


}

module.exports = addFav;