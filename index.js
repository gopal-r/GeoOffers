const express = require('express');
const bodyParser=require('body-parser');
const mongoose = require ('mongoose');
const Offer = require('./models/offers.js');

//set up express app
const app = express();

//connect to mongodb
mongoose.connect(process.env.CONNSTR||'mongodb://127.0.0.1/OffersDB');
mongoose.Promise = global.Promise;

app.use(express.static('public'));
//bodyparse to json
app.use(bodyParser.json());

//initialize routes
app.use('/api',require('./routes/api'));
// Constants
const PORT = process.env.port||4000;
const HOST = process.env.host||'0.0.0.0';




//listen  for requests
app.listen(PORT, function(){
console.log(`now listening for requests on endpoint http://${HOST}:${PORT}`)
})

const os = require('os');


console.log(`Running on pod ${os.hostname()} on endpoint http://${HOST}:${PORT} 
port:${process.env.port} 
host:${process.env.host} 
log_level:${process.env.LOG_LEVEL} 
log_location:${process.env.LOG_LOCATION} 
language:${process.env.LANGUAGE} 
connstr:${process.env.CONNSTR}`);

module.exports = app;