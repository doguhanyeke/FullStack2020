const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const returnOneUser = require('../utils/list_helper').returnOneUser
require('express-async-errors')

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

    const anyUser = await returnOneUser()

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: anyUser._id
    })

    const savedBlog = await blog.save()

    anyUser.blogs = anyUser.blogs.concat(savedBlog._id)
    await User.findByIdAndUpdate(anyUser._id, anyUser, {new: true})

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
  