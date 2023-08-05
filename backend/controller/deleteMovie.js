



const favModal = require('../modals/fav');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.SECRET;
const addFav = (req,res)=>{

const {movieId , token} = req.body;
const decoded = jwt.verify(token,jwt_secret);
const userId = decoded._id;
favModal.findOne({userId,movieId}).then((result)=>{
    if(result){
        favModal.deleteOne({ _id: result._id }, (err) => {
            if (err) {
              console.error('Error deleting the document:', err);
              res.status(404).json({error : 'error deleting the movie'});
            } else {
              console.log('Document deleted successfully.');
              res.status(200).json('deleted the movie successfully');
            }
          });
        } else {
          console.log('Document not found.');
        res.status(404).json('no such movie found')
        }
})


}

module.exports = addFav;
