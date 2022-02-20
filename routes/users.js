const express=require('express');
const router=express.Router();
const usersController=require('../controllers/users_controller');
const usersPosts=require('../controllers/posts_controller');
const passport = require('passport');

router.get('/profile', passport.checkAuthentication ,usersController.profile);
router.get('/posts',usersPosts.posts);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

// As we are doing post request in form data collection
router.post('/create',usersController.create);


router.get('/sign-out',usersController.destroySession);


// We have to create the route to create the session
// Use passport as the middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local', // Strategy that we are using
    {failureRedirect : '/users/sign-in'} // if authentication not then then it redirects to user sign in
), usersController.createSession); // if done then create Session function is called



module.exports = router;