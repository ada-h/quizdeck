var DeckModel = require('../models/DeckModel');


module.exports = {

    //Create a deck
    create: async function (req, res) {
        if (!req.body.name) {
            return res.status(400).json({ message: "Deck name is required." });
        }
        try {
            var Deck = new DeckModel({
                name: req.body.name,
                description: req.body.description,
                public: req.body.public,
                deckgenerator: req.verified._id,
            });

            Deck.save(function (err, User) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when creating Deck',
                        error: err
                    });
                }
                return res.status(201).json({ message: 'Deck created successfully', data: Deck });
            });

        } catch (error) {

            return res.status(500).json({
                message: 'Error processing requests.',
                error: error
            });
        }
    },

    //Edit deck details
    update: function (req, res) {
        var id = req.params.id;
        DeckModel.findOne({_id: id}, function (err, Deck) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Deck',
                    error: err
                });
            }
            if (!Deck) {
                return res.status(404).json({
                    message: 'Deck does not exist'
                });
            }

            Deck.name = req.body.name ? req.body.name : Deck.name;
			Deck.description = req.body.description ? req.body.description : Deck.description;
			Deck.public = req.body.public ? req.body.public : Deck.public;
			
            Deck.save(function (err, Deck) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Deck.',
                        error: err
                    });
                }

                return res.json({ message: "Deck updated successfully", data: Deck});
            });
        });
    },

    //Get one deck
    getone: function (req, res) {
        var id = req.params.id;
        DeckModel.findOne({_id: id}, function (err, Deck) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Deck.',
                    error: err
                });
            }
            if (!Deck) {
                return res.status(404).json({
                    message: 'No such Deck found'
                });
            }
            return res.json({message: "Found this Deck", data: Deck});
        });
    },

    //Delete a deck
    delete: function (req, res) {
        var id = req.params.id;
        DeckModel.findByIdAndRemove(id, function (err, Deck) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting this Deck.',
                    error: err
                });
            }
            return res.json({message: "Deck deleted successfully"});
        });
    },

    //Get  deck by a particular user
    userdeck: async function (req, res) {
        try{
            let alluserdecks = await DeckModel.find({deckgenerator: req.verified._id}).exec();
            return res.status(200).json({data: alluserdecks});
        }
        catch(err) {
            return res.status(500).json({
                message: 'Error when getting Deck.',
                error: err
            });
        }
    },

    //Get all public decks
    public: async function (req, res) {
        try{
            let alluserdecks = await DeckModel.find({public: true}).exec();
            return res.status(200).json({data: alluserdecks});
        }
        catch(err) {
            return res.status(500).json({
                message: 'Error when getting Deck.',
                error: err
            });
        }
    },


}