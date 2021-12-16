const express = require('express');
const router = express.Router();

const Game = require('../models/Game');
const Producer = require('../models/Producer');

router.get('/', async (req, res) => {
    try {

        const games = await Game.find({});
        return res.json({games})

    } catch (err) {
        return res.status(500).json({err})
    }
})

router.post('/', async (req, res) => {

    const { idProducer, name, genre, playingTime, url, complexity, minAge } = req.body;

    if (idProducer && name && genre && complexity){

        try {

            const exists = await Producer.find({_id: idProducer});

            if (exists) {

                const game = await Game.create({
                    name, genre, playingTime, complexity, minAge, 
                    producer: idProducer, offers: [], url
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


module.exports = router;