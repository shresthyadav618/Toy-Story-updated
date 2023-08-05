



const favModal = require('../modals/fav');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.SECRET;
const addFav = (req,res)=>{

const {movieId , token} = req.body;
const decoded = jwt.verify(token,jwt_secret);
const userId = decoded._id;
favModal.findOne({userId,movieId}).then((result)=>{
    if(result){
        favModal.deleteOne({userId,movieId}).then((result)=>{
            console.log('movie is deleted',result);
            res.status(200).json(result);
        }).catch((err)=>{
            console.log('there was some error deleting the movie',err);
            res.status(404).json({error : err});
        })
        } else {
          console.log('Document not found.');
        res.status(404).json('no such movie found')
        }
})


}

module.exports = addFav;
