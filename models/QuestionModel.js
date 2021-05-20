var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var QuizesSchema = new Schema({
	'createdon' : {type: Date, default: Date.now},
    'type': String,
    'question': String,
	'questionguests': {type: Schema.Types.ObjectId, ref: 'User'},
    'questionhist': String

});

module.exports = mongoose.model('Quizes', QuizesSchema);