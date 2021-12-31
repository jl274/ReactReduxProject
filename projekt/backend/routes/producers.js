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

router.put('/:id', async (req, res) => {
    const { name, established, country } = req.body;
    const { id } = req.params;

    if (name && established && country) {

        const exists = await Producer.exists({_id: id});

        if (exists){
            const date = new Date(established);
            await Producer.updateOne({_id: id},
                {name, established: new Date(date), country, offers: []}
            );
            const producer = await Producer.findOne({_id: id})

            return res.json({producer})
        } else {
            return res.status(404).json({err: "Producer not found"})
        }

    } else {
        return res.status(400).json({err: "Missing arguments"})
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const exists = await Producer.exists({_id: id});

    if (exists){
        
        await Producer.deleteOne({_id: id})

        return res.json({id})
    } else {
        return res.status(404).json({err: "Producer not found"})
    }
        
})

module.exports = router;