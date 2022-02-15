const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function(req, res){
    res.render("home");
})

app.get('/templates' ,function(req, res){
    res.render("templates");
});

app.get('/templates/:template', function(req, res){
    const template = "templates/"+req.params.template;
    res.render(template);
})

app.listen('3000', function(){
    console.log('listening on http://localhost:3000');
})