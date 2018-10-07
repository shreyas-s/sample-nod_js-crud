const mongoose = require('mongoose');
const validator = require('validator');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 8,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Email {VALUE}  should be of proper valid format'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate: {
            validator: function(val){
                return validator.isAlphanumeric(val,'en-US');
            },
            message: 'Password {VALUE} must be of Alpha Numeric format'
        }
    },
    name: {
        type: String,
        required: true
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

var User = mongoose.model('User',UserSchema);

module.exports= {User};