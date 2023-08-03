

const mongoose =  require('mongoose');
const express = require('express');

const app = express();

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : false
    },
    email : {
        type: String,
        required: true,
    },
    password : {
        type : String, 
        required : true
    },
    image : {
        type: String, 
        required : true
    }
});

module.exports = mongoose.model('user',userSchema);