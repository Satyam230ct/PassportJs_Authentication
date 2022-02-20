const User = require('../models/user');

module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title:'User Profile'
    });
}

// Rendering the sigup page
module.exports.signUp = function(req,res){

    // Means is user is already logedIn then we directly 
    if(req.isAuthenticated()){  // transfering it to profile page
       return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title:'Codeial | Sign Up'
    });
    
};

// Rendering thew sign in page
module.exports.signIn = function(req,res){

    // Means is user is already logedIn then we directly 
    if(req.isAuthenticated()){  // transfering it to profile page
        return res.redirect('/users/profile');
    }
   
    return res.render('user_sign_in',{
        title:'Codeial | Sign In'
    });
};

// Get the sign-up data
module.exports.create = function(req,res){
    
    if(req.body.password!=req.body.conform_password)
    {
        return res.redirect('back');
    }

    User.findOne({email: req.body.email},function(err,user){
        if(err){console.log('error in finding in signing up');  return;}
        console.log(user);
        if(!user){  // Means if user is not found then we have to create the user
            User.create(req.body,function(err,user){
                if(err){console.log('error in creating user signing up');  return;}
                return res.redirect('/users/sign-in');
            })     
        }else{
            return res.redirect('back');
        }
    });

};

// Sign in and create a session for the user
module.exports.createSession = function(req,res){
    return res.redirect('/');
};

module.exports.destroySession = function(req,res){
    
    req.logout();
    
    return res.redirect('/');
}