

const mongoose = require('mongoose');

const favSchema = mongoose.Schema({
    movieId : {
        type : String,
        required : true
    },
    token : {
        //changing userId to token
        type : String,
        required: true
    }
});

module.exports = mongoose.model('favMovies',favSchema);