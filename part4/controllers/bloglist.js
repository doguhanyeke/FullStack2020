const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const returnOneUser = require('../utils/list_helper').returnOneUser
require('express-async-errors')
const jwt = require('jsonwebtoken')

blogRouter.get('/api/blogs', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {blogs: 0})
    response.json(blogs)
})
  
blogRouter.post('/api/blogs', async (request, response) => {
    const body = request.body
    if(body.title === undefined && body.url === undefined){
      return response.status(400).end()
    }
    if(body.likes === undefined){
      body.likes = 0
    }
    if(!request.token){
      return response.status(401).json({
        error: 'token not found!'
      })
    }
    
    const userInfo = jwt.verify(request.token, process.env.SECRET)
    if(!userInfo.id || !userInfo.username){
      return response.status(401).json({
          error: 'token not authorized!'
      })
    }

    const user = await User.findById(userInfo.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await User.findByIdAndUpdate(user._id, user, {new: true})

    return response.status(201).json(savedBlog)    
})

blogRouter.delete('/api/blogs/:id', async (req, res, next) => {
  const idOfBlog = req.params.id
  const result = await Blog.findByIdAndRemove(idOfBlog)
  res.status(204).end()
})

blogRouter.put('/api/blogs/:id', async (req, res, next) => {
  const toBeUpdatedBlog = req.body

  const newBlog = {
    likes: toBeUpdatedBlog.likes
  }

  console.log(newBlog)

  const result = await Blog.findByIdAndUpdate(
    req.params.id,
    newBlog,
    {new: true}
  )

  res.json(result)
})

module.exports = blogRouter
  