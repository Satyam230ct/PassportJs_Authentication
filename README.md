# PassportJs_Implement
with Express and mongooDB

Steps->

1) We created passport local Strategy; (in Config)
 Then we created a function basically a new strategy allocated to the middleware declare the
 usernameField to email
 Then if the user is found the we retrun done function (a call Back function) 
 
 Moving to serializeUser -> Picks out the information from the user which need to be set to seession cookie
 and we have setted only user.id here
 
 Finally deserializeUser-> Picking out id from the session cookie and converting it into user finding into the database

checkAuthentication method -> Usually it used a middleware it is passed into the route as req,res and next so 
if the user is authenticated say return to the next() function otherwise take us to sign in page

now to access the Authenticated user in views for that use setAuthenticatedUser
here we checking req.isAuthenticated() so if it's true we set the locals.user = req.user
and then passed to the next function 


2) Comming to the indexjs main file 
  We creating a session now with mongstore to store the session information even the server restarts info don't lose
 
3) Come to routes where session is created if passport.authenticate is true 

We wanted profile page accessable only when the user is sign in so here also in user.js we applying passport.ckeckAuthentication on it
This function check basically the user is authenticated and moves on to next function else sign-In

4) Last thing we have done is create a header (in views) 
 So here if locals.user is there then we create sign-out anchor else we do sign-in and sign-up
