const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res ) => {
    const body = req.body

    const uname = body.username
    const pword = body.password

    const user = await User.findOne({ username: uname })
    console.log(user)

    console.log(uname, pword, user.name, user.passwordHash)
    const passwordCorrect = user === null ? false
        : await bcrypt.compare(pword, user.passwordHash)

    console.log(passwordCorrect)
    if(!passwordCorrect){
        return res.status(401).json({ error: 'invalid username or password' })
    }

    const userToken = {
        username: uname,
        id: user._id
    }

    const token = jwt.sign(userToken, process.env.SECRET)
    console.log('token: ', token)

    res.status(200).send(
        { token: token, username: uname, name: user.name, id: user._id }
    )
})

module.exports = loginRouter