var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var DeckSchema = new Schema({
	'createdon' : {type: Date, default: Date.now},
    'name': String,
    'description': String,
    'public': Boolean,
	'deckguests': {type: Schema.Types.ObjectId, ref: 'User'},
    'deckquestions': [{type: Schema.Types.ObjectId, ref: 'Question'}],
    'deckgenerator': String,

});

module.exports = mongoose.model('Deck', DeckSchema);