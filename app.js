const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

var session = require('express-session');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.use(session({
    secret: 'oh my little dirty secret',
    resave: false,
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
    email: String,
    password: String,
})

const TemplateSchema = {
    data: Object,
    userId: String,
}
UserSchema.plugin(passportLocalMongoose)
// UserSchema.plugin(findOrCreate);

const Template = mongoose.model("Template", TemplateSchema);
const User = mongoose.model("User", UserSchema);


passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
    done(null, user.id);
    // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});





app.get('/', function (req, res) {
    res.render("home");
})

app.get('/templates', function (req, res) {
    res.render("templates");

});

app.get('/templates/:template', function (req, res) {


    if (req.isAuthenticated()) {
        const template = "templates/" + req.params.template;
        res.render(template);
    } else {
        res.render('login');
    }



})



app.post('/mountains/', function (req, res) {
    let username = req.session.username;
        res.redirect("/" + username + "/mountain");
});

app.post('/dark/', function (req, res) {
    let username = req.session.username;
        res.redirect("/" + username + "/dark");
});

// mountain js post route

app.post('/mountain/post', function (req, res) {
    User.findOne({ username: req.session.username }, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            
            Template.findOne({ userId: result._id }, function (err, results) {
                
                if (results == null) {
                    const template = new Template({
                        data: req.body,
                        userId: result._id,
                    })
                    template.save(function (err) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("saved Securly");
                        }
                    })

                }
                else
                {
                    console.log("updating template");
                    Template.findOneAndUpdate({userId: result._id}

                    , {$set: {data: req.body}}
                    
                    , function (err, doc) {
                    
                        if (err) {
                    
                            console.log("update document error");
                    
                        } else {
                    
                            console.log("update document success");
            
                        }
                    
                    });

                }
            });


        }
    });

});


//dark js Post route

app.post('/dark/post', function (req, res) {
    console.log("posting in dark")
    User.findOne({ username: req.session.username }, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("user Found");
            Template.findOne({ userId: result._id }, function (err, results) {
                if (results == null) {
                    console.log("new dark template is creatnng")
                    const template = new Template({
                        data: req.body,
                        userId: result._id,
                    })
                    template.save(function (err) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("saved Securly");
                        }
                    })

                }
                else
                {
                    console.log("updating previous")
                    Template.findOneAndUpdate({userId: result._id}

                    , {$set: {data: req.body}}
                    
                    , function (err, doc) {
                    
                        if (err) {
                    
                            console.log("update document error");
                    
                        } else {
                            
                            console.log("update document success");
            
                        }
                    
                    });

                }
            });


        }
    });

});


app.get('/login', function (req, res) {
    res.render('login');
})



app.post('/login', (req, res) => {

    const user = new User({
        email: req.body.username,
        password: req.body.password,
    });

    req.session.username = req.body.username;
    req.login(user, function (err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/templates");
            })
        }
    })

});


app.post('/register', (req, res) => {
    req.session.username = req.body.username;
    User.register({ username: req.body.username }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect('/register');
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/templates");
            })
        }
    });

});


// app.get('/secrets', (req, res)=>{
//     if(req.isAuthenticated()){
//         res.render('templates');
//     }else{
//         res.redirect('/');
//     }
// })


app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

app.get('/:username/mountain', function (req, res) {
    // console.log(req.params.username);
    User.findOne({ username: req.params.username }, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            // console.log(result._id);
            Template.findOne({ userId: result._id }, function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    // console.log(result.userId);
                    res.render("templates/mountainscopy", { data: result.data });
                }
            })

        }
    });

});

app.get('/:username/dark', function (req, res) {
    // console.log(req.params.username);
    User.findOne({ username: req.params.username }, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            // console.log(result._id);
            Template.findOne({ userId: result._id }, function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(result);
                    res.render("templates/darkcopy", { data: result.data });
                }
            })

        }
    });

});



app.get("/index", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})





app.listen('3000', function () {
    console.log('listening on http://localhost:3000');
})