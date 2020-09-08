const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { response } = require('express')
require('express-async-errors')

blogRouter.get('/api/blogs', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogRouter.post('/api/blogs', async (request, response) => {
    const blog = new Blog(request.body)
    if(!blog.likes){
      blog.likes = 0
    }

    if(!blog.title && !blog.url){
      response.status(400).end()
    } else {
      const result = await blog.save()
      response.status(201).json(result)
    }    
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
  