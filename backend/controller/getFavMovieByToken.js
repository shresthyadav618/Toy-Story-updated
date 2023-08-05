


const favModal = require('../modals/fav');

const getFavMovieByToken = (req,res)=>{
const {token} = req.body;

favModal.find({token}).then((result)=>{
res.status(200).json(result);
}).catch((err)=>{
res.status(404).json({error : 'some error getting the fav movies',err});
})

}

module.exports = getFavMovieByToken;