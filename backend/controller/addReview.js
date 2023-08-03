


const ratingModal = require('../modals/ratings');

const addRating = (req,res)=>{

const {rating,message,movieId,userId} = req.body;

const newRating = ratingModal({
    rating : rating,
    message : message,
    movieId : movieId,
    userId : userId
});

newRating.save().then((result)=>{
    console.log('new rating is added');
    res.status(200).json(result);
}).catch((err)=>{
    console.log('there was some error while adding the rating',err);
    res.status(404).json({error : err});
})

}

module.exports = addRating;