const express = require('express');
const router = express.Router();

const Offer = require('../models/Offer');
const Game = require('../models/Game');

router.get('/', async (req, res) => {
    try {

        const offers = await Offer.find({});
        return res.json({offers})

    } catch (err) {
        return res.status(500).json({err})
    }
})

router.post('/', async (req, res) => {
    const { product, price, link, shop } = req.body;

    if (product && price && link && shop){
        try {
            const exists = await Game.exists({_id: product});

            if (exists) {

                const game = await Game.findOne({_id: product});
                const offer = await Offer.create({shop, product, price, link});
                game.offers.push(offer._id);
                await game.save();

                return res.json({offer})

            } else {
                return res.status(404).json({err: "Game not found"})
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
        const exists = await Offer.exists({_id: id});

        if (exists){

            const offer = await Offer.findOne({_id: id})
            await Offer.deleteOne({_id: id});
            const game = await Game.findOne({_id: offer.product});
            await Game.updateOne({_id: game._id}, {offers: game.offers.filter(x => x != id)})

            return res.json({id})

        } else {
            return res.status(404).json({err: "Offer not found"})
        }
    } catch {
        return res.status(500).json({err})
    }
})

router.put('/:id', async (req, res) => {
    const { product, price, link, shop } = req.body;
    const { id } = req.params;

    if (product && price && link && shop){
        try {
            const exists = await Offer.exists({_id: id});

            if (exists) {

                await Offer.updateOne({_id: id}, {shop, product, price, link});

                return res.json({offer: {_id: id, product, price, link, shop}})

            } else {
                return res.status(404).json({err: "Offer not found"})
            }

        } catch (err) {
            return res.status(500).json({err})
        }
    } else {
        return res.status(400).json({err: "Missing arguments"})
    }
})

module.exports = router;