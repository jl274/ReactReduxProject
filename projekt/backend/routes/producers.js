const express = require('express');
const router = express.Router();

const Producer = require('../models/Producer');

router.get('/', async (req, res) => {
    try {

        const producers = await Producer.find({});
        return res.json({producers})

    } catch (err) {
        return res.status(500).json({err})
    }
})

router.post('/', async (req, res) => {
    const { name, established, country } = req.body;

    if (name && established && country) {

        const date = new Date(established);
        const producer = await Producer.create({name, established: new Date(date), country, offers: []})

        return res.json({producer})

    } else {
        return res.status(400).json({err: "Missing arguments"})
    }
})

module.exports = router;