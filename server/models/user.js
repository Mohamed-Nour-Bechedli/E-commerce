const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name : { type : String, required : true },
    email : { type : String, required : true, unique : true },
    password : { type : String, required : true },
    image : { type : String, default : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" },
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