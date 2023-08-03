


const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    rating : {
        type : String,
        required: true
    },
    message : {
        type : String,
        required : true
    },
    movieId : {
        type : String,
        required: true
    },
    userId : {
        type : String,
        required:  true
    }
});

module.exports = mongoose.model('rating',ratingSchema);