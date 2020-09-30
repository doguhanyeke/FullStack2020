const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    comments: []
})

blogSchema.set('toJSON', {
    transform: (doc, retObj) => {
        retObj.id = retObj._id.toString()
        delete retObj._id
        delete retObj.__v
        return retObj
    }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog