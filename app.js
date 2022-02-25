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



app.post('/mountains', function(req, res){
    res.render('home');
    
});

app.post('/mountain/post',function(req, res){
    const mountain = new Mountain({
        data:req.body
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





app.listen('3000', function(){
    console.log('listening on http://localhost:3000');
})


























// app.post('/register', function(req, res){

//     const username = req.body.username;
//     const password = req.body.password;

//     bcrypt.hash(password,saltRound,function(err,hash){


//         const newUser = new User({
//             email: username,
//             password: hash,
//         });
    
//         newUser.save(function(err){
//             if(err) {
//                 console.log(err);
//             }else
//             {
//                 console.log("Registration Successful");
//                 res.render('templates');
//             }
//         })

//     })

    
// })

// app.post('/login', function(req, res){








//     const username = req.body.username;
//     const password = req.body.password;

//     User.findOne({email: username}, function(err, user){
//         if(err) {
//             console.log(err);
//         }else
//         {
//             if(user)
//             {
//                 bcrypt.compare(password, user.password,function(err,result){
//                     if(result){
//                         console.log("login Successful ");
//                         res.render("templates");
//                     }
//                 })   

//             }
//         }
//     })
// })
