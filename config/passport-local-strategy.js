// Setting up passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// authentication using passport
/* 1) Finding user with the particular username and password exist or not
   2) If existed we wanted to set that user into the cookie (Passport.js uses session cookie which is encrypted)
*/

passport.use(new LocalStrategy({ // Telling passport to use LocalStrategy
    usernameField:'email' // This is what we going to keep unique
    },
    function(email,password,done){
        // Find a user and establish the identity
        User.findOne({email:email},function(err,user){ //{email,email} (1st one is we are looking in db 2nd one is the value of email what we ahve passed)
            if(err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }
            
            if(!user || user.password!=password){
                console.log('invalid Username/Password');
                return done(null,false);
            }
            
            return done(null,user); // Finally here user is found
        });
}));

// Serializing the user to decide which key is to be kept in the cookies
//-> When we authenticating the user through manual autheticaton making out id and puting it into cookie
passport.serializeUser(function(user,done){
    done(null, user.id); // using user id (encrypted format here)
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){
            console.log('Error in finding user--> Passport');
            return done(err);
        }
        return done(null,user);
    });
});


// Check if the user is authenticated (For that we creating a function checkAuthenticate)
passport.checkAuthentication = function(req,res,next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

// One more function we writing to set the user to the views
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated())
    {
        // req.user contains the current signed in user from the session cookie and we are just sending 
        // this to the local for the views
        res.locals.user = req.user;
    }

    next();
    
}

module.exports = passport;