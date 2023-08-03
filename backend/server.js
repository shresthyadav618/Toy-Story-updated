
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const route = require('./routes/routes');
const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const cors = require('cors');
console.log(MONGO_URL);
const app = express();
app.use(cors());
app.use(express.json({limit : '5mb'}));
app.use(express.urlencoded({extended : true}));
app.use('/def',route)
mongoose.connect(MONGO_URL).then(()=>{
    console.log('connected to the mongo database');
    app.listen(port,()=>{
        console.log('listening to the changes at port ',port);
    })
   
})