


const favModal = require('../modals/fav');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.SECRET;
const addFav = (req,res)=>{

const {movieId , token} = req.body;
const decoded = jwt.verify(token,jwt_secret);
const userId = decoded._id;
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
            console.log('there was some error while adding the movie');
            res.status(404).json({error : 'there was some error while adding the movie you wanted'});
        })
    }
})


}

module.exports = addFav;