const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
require('express-async-errors')
const jwt = require('jsonwebtoken')

blogRouter.get('/api/blogs', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { blogs: 0 })
    response.json(blogs)
})

blogRouter.post('/api/blogs', async (request, response) => {
    console.log('burdaaaa')
    const body = request.body
    if(body.title === undefined && body.url === undefined){
        return response.status(400).end()
    }
    console.log('burdaaaa2')
    if(body.likes === undefined){
        body.likes = 0
    }
    console.log('burdaaaa3')
    if(!request.token){
        return response.status(401).json({
            error: 'token not found!'
        })
    }
    console.log('burdaaaa4')
    const userInfo = jwt.verify(request.token, process.env.SECRET)
    if(!userInfo.id || !userInfo.username){
        return response.status(401).json({
            error: 'token not authorized!'
        })
    }
    console.log('burdaaaa5')
    const user = await User.findById(userInfo.id)
    console.log('user: ', user, userInfo.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    console.log('savedBlog', savedBlog)

    user.blogs = user.blogs.concat(savedBlog._id)
    await User.findByIdAndUpdate(user._id, user, { new: true })

    const returnedBlog = await Blog.findById(savedBlog.id)
    console.log('returnedBlog', returnedBlog)
    return response.status(201).json(returnedBlog)
})

blogRouter.delete('/api/blogs/:id', async (req, res) => {
    if(!req.token){
        return res.status(401).json({
            error: 'token not found!'
        })
    }

    const userInfo = jwt.verify(req.token, process.env.SECRET)
    if(!userInfo.id || !userInfo.username){
        return res.status(401).json({
            error: 'token not authorized!'
        })
    }

    const blog = await Blog.findById(req.params.id)
    const user = await User.findById(userInfo.id)
    console.log('blog', blog.toJSON())
    console.log('user', user)
    console.log('user id', user._id)
    console.log('blog user id: ', blog.toJSON().user.toString())

    if(blog.toJSON().user.toString() !== user._id.toString()){
        return res.status(401).json({
            error: 'different username used for deleting!'
        })
    }

    await Blog.findByIdAndRemove(req.params.id)
    return res.status(204).send({
        info: 'operation successful'
    })
})

blogRouter.put('/api/blogs/:id', async (req, res) => {
    const toBeUpdatedBlog = req.body

    const newBlog = {
        likes: toBeUpdatedBlog.likes
    }

    console.log(newBlog)

    const result = await Blog.findByIdAndUpdate(
        req.params.id,
        newBlog,
        { new: true }
    )

    res.json(result)
})

blogRouter.post('/api/blogs/:id/comments', async (req,res) => {
    console.log('here')
    const comment = req.body.comment
    const blogId = req.params.id
    console.log('id, comment', blogId, comment)
    const blog = await Blog.findById(blogId)
    blog.comments = blog.comments.concat(comment)
    const savedBlog = await blog.save()
    return res.json(savedBlog)
})

module.exports = blogRouter