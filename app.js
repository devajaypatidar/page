const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const res = require('express/lib/response');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
// const bcrypt  = require('bcrypt');
// const saltRound = 10;
let userId ;

var session = require('express-session');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.use(session({
    secret:'oh my little dirty secret',
    resave : false,
    saveUninitialized: true,
    
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'pageDB',
    useNewUrlParser: true,
    useUnifiedTopology: true 
});



const UserSchema = new mongoose.Schema({
    email:String,
    password:String,
})

const MountainSchema ={
    data: Object,
    userId: String,
}
UserSchema.plugin(passportLocalMongoose)
// UserSchema.plugin(findOrCreate);

const Mountain = mongoose.model("Mountain",MountainSchema);
const User = mongoose.model("User",UserSchema);


passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id); 
   // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


app.get('/', function(req, res){
    res.render("home");
})

app.get('/templates' ,function(req, res){
    res.render("templates");
    
});

app.get('/templates/:template', function(req, res){


    if(req.isAuthenticated()){
        const template = "templates/"+req.params.template;
        res.render(template);
    }else{
        res.render('options');
    }

    
    
})



app.post('/mountains/', function(req, res){
    let username = req.session.username
    res.redirect("/"+username+"/mountain");
});

app.post('/mountain/post',function(req, res){

    User.findOne({username: req.session.username}, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            const mountain = new Mountain({
                data:req.body,
                userId: result._id,
            })
            mountain.save(function(err){
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    console.log("saved Securly");
                }
            })


        }
    });

    


    
    
});


app.get('/login', function(req, res){
    res.render('login');
})

app.get('/register', function(req, res){
    res.render('register');
})


app.post('/login', (req, res) => {

    const user = new User({
        email : req.body.username,
        password : req.body.password,
    });

    req.session.username = req.body.username;

    req.login(user,function(err){
        if(err){
            console.log(err);
        }else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/templates");
            })
        }
    })

});


app.post('/register', (req, res) => {

    req.session.username = req.body.username;
    User.register({username: req.body.username} , req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.redirect('/register');
        }else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/templates");
            })
        }
    });

});


app.get('/secrets', (req, res)=>{
    if(req.isAuthenticated()){
        res.render('templates');
    }else{
        res.redirect('/');
    }
})


app.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/');
})

app.get('/:username/mountain',function(req, res){
    
    User.findOne({username: req.params.username}, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            Mountain.findOne({userid: result._id},function(err, result) {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    
                    res.render("templates/mountainscopy",{data: result.data});
                }
            })

        }
    });

});




app.listen('3000', function(){
    console.log('listening on http://localhost:3000');
});
