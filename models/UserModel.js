var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt = require('bcrypt');
const saltRounds = 10;


var UserSchema = new Schema({
	'createdon' : {type: Date, default: Date.now},
    'email': String,
    'username': String,
	'phonenumber' : String,
    'password': String,
    'referralCode' : String,
    'friends': {type: Schema.Types.ObjectId, ref: 'User'},
    'personalquizes': {type: Schema.Types.ObjectId, ref: 'Quizes'},
    'generalquizes': {type: Schema.Types.ObjectId, ref: 'Quizes'},
    'invitequizes': {type: Schema.Types.ObjectId, ref: 'Quizes'}

});


// hash the password before the user is saved
UserSchema.pre('save', function (next) {
    var user = this;

    // hash the password only if the password has been changed or user is new
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(saltRounds, function(err, salt) {
	    bcrypt.hash(user.password, salt, function(err, hash) {
	        // change the password to the hashed version
	        user.password = hash;
	        next();
	    });
	});
});

// method to compare a given password with the database hash
UserSchema.methods.comparePassword = function (password) {
	var user = this;
	
	bcrypt.compare((user.password, password), function(err, result) {
    	return result
	});
};

module.exports = mongoose.model('User', UserSchema);