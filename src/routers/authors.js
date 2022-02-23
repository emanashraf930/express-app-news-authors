const express = require('express')
const Authors = require('../models/authors')
const router = new express.Router()

//post
router.post('/authors', async(req, res) => {
    try {
        const authors = new Authors(req.body)
        await authors.save()
        const token = await authors.generateToken()
        res.status(200).send({ authors, token })
    } catch (e) {
        res.status(400).send(e)
    }
})


//get all
router.get('/authors', (req, res) => {
    Authors.find({}).then((authors) => {
        res.status(200).send(authors)
    }).catch((e) => {
        res.status(500).send(e)
    })
})


//login
router.post('/login', async(req, res) => {
    try {
        const authors = await Authors.findByCredentials(req.body.email, req.body.password)
        const token = await Authors.generateToken()
        res.status(200).send({ authors, token })
    } catch (e) {
        res.status(400).send(e.message)
    }
})


// get profile
router.get('/profile', async(req, res) => {
    res.status(200).send(req.authors)
})


//patch
router.patch('/authors/:id', async(req, res) => {
    try {
        const updates = Object.keys(req.body)
        const authors = await Authors.findById(req.params.id)

        if (!authors) {
            return res.status(404).send('No user is found')
        }

        updates.forEach((el) => (authors[el] = req.body[el]))
        await authors.save()
        res.status(200).send(authors)
    } catch (e) {
        res.status(400).send(e)
    }
})


//delete profile by id 
router.delete('/authors/:id', async(req, res) => {
    try {
        const authors = await Authors.findByIdAndDelete(req.params.id)
        if (!authors) {
            return res.status(404).send('No user is found')
        }
        res.status(200).send(authors)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

//logout
router.delete('/logout', async(req, res) => {
    try {
        req.authors.tokens = req.authors.tokens.filter((el) => {
            return el !== req.token
        })
        await req.authors.save()
        res.send('Logout Successfully')
    } catch (e) {
        res.status(500).send(e)
    }
})


module.exports = router