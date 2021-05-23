var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var QuestionSchema = new Schema({
	'createdon' : {type: Date, default: Date.now},
    'type': Number,
    'title': String,
	'questionguests': {type: Schema.Types.ObjectId, ref: 'User'},
    'questiondeck': String,
    'questionoptions': Array,
    'answer': String

});

module.exports = mongoose.model('Question', QuestionSchema);