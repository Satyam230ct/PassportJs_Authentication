const mongoose= require('mongoose');

// Connecting to database
mongoose.connect('mongodb://localhost/codeial_development');

const db=mongoose.connection;

db.on('error',console.error.bind(console,'Error while connection to MongoDB'));

db.once('open',function(){
    console.log('Connected to Databse :: MongoDB');
});

module.exports=db;