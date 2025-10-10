const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// User Schema
const userSchema = new mongoose.Schema({
    name : { type : String, required : true },
    email : { type : String, required : true, unique : true },
    password : { type : String, required : true },
    image : { type : String },
    role : { type : String, enum : ['user', 'admin'], default : 'user' },
    verified : { type : Boolean, default : false },
});

// Method to generate JWT
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({
        _id : this._id,
        name : this.name,
        email : this.email,
        role : this.role,
        image : this.image
    }, process.env.JWT_SECRET, { expiresIn : '1h' });
    return token;
}

const User = mongoose.model('User', userSchema);
module.exports = User;