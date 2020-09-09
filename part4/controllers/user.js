const userRouter = require('express').Router()
const User = require('../models/user')
const bycrypt = require('bcrypt')
require('express-async-errors')

userRouter.get('/', async (req, res) => {
    const users = await User.find({})
    return res.status(200).json(users)
})

userRouter.post('/', async (req, res, next) => {
    if (req.body.password === undefined) {
        return res.status(400).send({error: 'password must be provided'})
    }
    if (req.body.password.length < 3) {
        return res.status(400).send({error: 'password must be at least 3-characters long'})
    }

    const passHash = await bycrypt.hash(req.body.password, 10)
    console.log(typeof(passHash))
    const newUser = new User({
        username: req.body.username,
        name: req.body.name,
        passwordHash: passHash
    })

    const user = await newUser.save(newUser)
    res.json(user)
})

module.exports = userRouter