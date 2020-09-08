const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
})

userSchema.set('toJSON', {
    transform: (doc, returnObject) => {
        returnObject.id = returnObject._id.toString()
        delete returnObject.__v
        delete returnObject._id
        delete returnObject.passwordHash

        return returnObject
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User