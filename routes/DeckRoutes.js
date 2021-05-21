var express = require('express');
var router = express.Router();
var DeckController = require('../controllers/DeckController');
var middlewares = require("../utils/middleware.js");


//Get all decks for a user
router.get('/user',middlewares.checkToken, DeckController.userdeck);

//Get all public decks
router.get('/public', DeckController.public);

//Get a particular deck
router.get('/:id', middlewares.checkToken, DeckController.getone);

//Create a deck
router.post('/create', middlewares.checkToken, DeckController.create);

//Edit a deck
router.post('/edit/:id', middlewares.checkToken, DeckController.update);

//Delete a deck
router.delete('/:id', middlewares.checkToken, DeckController.delete);




module.exports = router;