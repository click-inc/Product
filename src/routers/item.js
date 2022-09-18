const express = require('express')
const Item = require('../models/item')
const Auth = require('../middleware/auth')

const router = new express.Router()

//fetch all items
router.get('/items', async(req, res) => {
    if(req.query.user == 1) {
        try {
           const items = await Item.find({ owner: req.userId})
            res.status(200).send(items)
        } catch (error) {
            console.log(error)
            res.status(500).send('something went wrong')
        }
    } else {
    try {
        const items = await Item.find({})
        res.status(200).send(items)
    } catch (error) {
        res.status(400).send(error)
    }
}
})

//fetch an item
router.get('/items/one', async(req, res) => {
    try{
        const item = await Item.findOne({_id: req.headers.id})
        if(!item) {
            res.status(404).send({error: "Item not found"})
        }
        res.status(200).send(item) 
    } catch (error) {
        res.status(400).send(error)
    }
})

//create an item
router.post('/items', async(req, res) => {
    try {
        const newItem = new Item({
            ...req.body
        })
        await newItem.save()
        res.status(201).send(newItem)
    } catch (error) {
        console.log({error})
        res.status(400).send({message: "error"})
    }
})

//update an item

router.patch('/items',  async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'description', 'category', 'price', 'image']

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({ error: 'invalid updates'})
    }

    try {
        const item = await Item.findOne({ _id: req.headers.id})
    
        if(!item){
            return res.status(404).send()
        }

        updates.forEach((update) => item[update] = req.body[update])
        await item.save()
        res.send(item)
    } catch (error) {
        res.status(400).send(error)
    }
})

//delete item
router.delete('/items', async(req, res) => {
    try {
        const deletedItem = await Item.findOneAndDelete( {_id: req.headers.id} )
        if(!deletedItem) {
            res.status(404).send({error: "Item not found"})
        }
        res.send(deletedItem)
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = router