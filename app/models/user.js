const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

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

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
  
    return _.pick(userObject, ['_id', 'email']);
  };
  

UserSchema.statics.findByAuthTokenId = function(tokenId){
    var User = this;
    var tokenInfo;

    try{
        tokenInfo = jwt.verify(tokenId,'SHRSALTING');

    }
    catch(e){
        return Promise.reject('could not match token Id with User info.');
    }
    return User.findOne({
        '_id': tokenInfo._id,
        'tokens.token': tokenId,
        'tokens.access': 'auth'
    });
};

UserSchema.methods.generateTokenForAuthentication = function(){
    var usr = this;
    var access = 'auth';
   
    var token = jwt.sign({_id: usr._id.toHexString(),access},'SHRSALTING').toString();
    usr.tokens = usr.tokens.concat([{access,token}]);
    return usr.save().then(()=>{ return token;});
   }
   
var User = mongoose.model('User',UserSchema);


module.exports= {User};