// Creating the schema

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true    // Email id can't be dublicates
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
},{
    timestamps: true // Controles date and time (created at and updated at)
});

const User = mongoose.model('User',userSchema);

module.exports = User;
