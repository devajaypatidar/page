const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.get('/', function(req, res){
    res.send("Hello welcome to the website");
})

app.listen('3000', function(){
    console.log('listening on http://localhost:3000');
})