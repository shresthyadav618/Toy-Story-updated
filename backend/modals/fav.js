

const mongoose = require('mongoose');

const favSchema = mongoose.Schema({
    movieId : {
        type : Number,
        required : true
    },
    userId : {
        type : String,
        required: true
    }
});

module.exports = mongoose.model('favMovies',favSchema);