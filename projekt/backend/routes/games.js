const express = require('express');
const router = express.Router();

const Game = require('../models/Game');
const Producer = require('../models/Producer');
const Offer = require('../models/Offer');

router.get('/', async (req, res) => {
    try {

        const games = await Game.find({});
        return res.json({games})

    } catch (err) {
        return res.status(500).json({err})
    }
})

router.post('/', async (req, res) => {

    const { idProducer, name, genre, playingTime, url, complexity, minAge, description } = req.body;

    if (idProducer && name && genre && complexity){

        try {

            const exists = await Producer.exists({_id: idProducer});

            if (exists) {

                const game = await Game.create({
                    name, genre, playingTime, complexity, minAge, 
                    producer: idProducer, offers: [], url, description
                });

                return res.json({game})

            } else {
                return res.status(404).json({err: "Producer not found"})
            }

        } catch (err) {
            return res.status(500).json({err})
        }

    } else {
        return res.status(400).json({err: "Missing arguments"})
    }

})

router.put('/:id', async (req, res) => {

    const { idProducer, name, genre, playingTime, url, complexity, minAge } = req.body;
    const { id } = req.params;

    if (idProducer && name && genre && complexity){

        try {

            const exists = await Producer.exists({_id: idProducer});
            const game_exists = await Game.exists({_id: id})

            if (exists && game_exists) {

                await Game.updateOne({_id: id}, {
                    name, genre, playingTime, complexity, minAge, 
                    producer: idProducer, offers: [], url
                });
                const game = await Game.find({_id: id});

                return res.json({game})

            } else {
                return res.status(404).json({err: "Producer or game not found"})
            }

        } catch (err) {
            return res.status(500).json({err})
        }

    } else {
        return res.status(400).json({err: "Missing arguments"})
    }

})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {

        const exists = await Game.exists({_id: id});

        if (exists) {

            await Game.deleteOne({_id: id});
            await Offer.deleteMany({product: id})

            return res.json({id})

        } else {
            return res.status(404).json({err: "Game not found"})
        }

    } catch (err) {
        return res.status(500).json({err})
    }
})

module.exports = router;