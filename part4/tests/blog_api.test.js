const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

/*
api variable is a superobject which enables
HTTP requests from client side
*/
const api = supertest(app)

/*
beforeEach is Jest function
*/
let token = ""
beforeEach(async () => {
    await Blog.deleteMany({})
    console.log("blogs deleted")
    await User.deleteMany({})
    console.log("users deleted")

    const user = {
      username: "two",
      name: "dido",
      password: "gizli"
    }
    let result = await api.post('/api/users').send(user)
    console.log("1 user added")

    result = await api.post('/api/login').send({
      username: "two",
      password: "gizli"
    })
    
    token = result.body.token
    
    await api
    .post('/api/blogs')
    .set({'Authorization': `bearer ${token}`})
    .send({
      title: "asd",
      author: "dogu",
      url: "url.co",
      likes: 5
    })
    console.log("1 blog created")
})

test('GET request works', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('POST request works', async () => {
  const blogs = await api.get('/api/blogs')
  const blogBody = blogs.body

  await api
    .post('/api/blogs')
    .set({"Authorization": `bearer ${token}`})
    .send({
      title: "asd",
      author: "dogu",
      url: "url.co",
      likes: 5
    })

  const blogs2 = await api.get('/api/blogs')
  const blogBody2 = blogs2.body
  expect(blogBody2.length).toBe(blogBody.length + 1)
})

test('_id does not appear', async () => {
  const blogs = await api
    .get('/api/blogs')
    .expect(200)
  const body = blogs.body
  console.log("bodi", body)
  expect(body[0]._id).not.toBeDefined()
})

test('id does appear', async () => {
  const blogs = await api
    .get('/api/blogs')
    .expect(200)
  const body = blogs.body
  expect(body[0].id).toBeDefined()
})

test('when property of like missed, it defaulted to 0', async () => {
  await api
  .post('/api/blogs')
  .set({"Authorization": `bearer ${token}`})
  .send({
    title: "temp",
    author: "doguh",
    url: "url.com"
  })

  const blogs = await api
    .get('/api/blogs')
    .expect(200)

  blogBodies = blogs.body
  const blogTemp = blogBodies.find(blog => blog.title === 'temp')

  expect(blogTemp.likes).toBe(0)
})

test('title and url missed', async () => {
  await api
  .post('/api/blogs')
  .send({
    author: "doguh",
    likes: 3
  })
  .expect(400)
})

test('delete a blog', async () => {
  await api
  .post('/api/blogs')
  .set({"Authorization": `bearer ${token}`})
  .send({
    author: "doguh",
    title: "tit",
    author: "dy",
    likes: 3
  })
  .expect(201)

  let blogs = await api
    .get('/api/blogs')
    .expect(200)

  let blogBodies = blogs.body
  let blogTemp = blogBodies.find(blog => blog.title === 'tit')
  const idOfBlog = blogTemp.id

  await api
    .delete(`/api/blogs/${idOfBlog}`)
    .set({"Authorization": `bearer ${token}`})

  blogs = await api
    .get('/api/blogs')
    .expect(200)

  blogBodies = blogs.body
  blogTemp = blogBodies.find(blog => blog.title === 'tit')
  
  expect(blogTemp).not.toBeDefined()
})

test('update a post', async () => {
  const blogs = await api.get('/api/blogs')
  const blogBodies = blogs.body

  const soonUpdatedBlog = blogBodies.find(blog => blog.title === 'asd')

  await api.put(`/api/blogs/${soonUpdatedBlog.id}`)
  .send({likes: 1001001})
  .expect(200)
})

test('token is not provided, Unauthorized', async () => {
  const blog = await api
  .post('/api/blogs')
  .set({"Authorization": `bearer ${token}`})
  .send({
    author: "doguh",
    title: "tit",
    author: "dy",
    likes: 3
  })

  await api
    .delete(`/api/blogs/${blog.id}`)
    .expect(401)
    
})

afterAll(() => {
  mongoose.connection.close()
})