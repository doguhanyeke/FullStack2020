import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import axios from 'axios'
import 'express-async-errors'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("handle login")
    const response = await axios.post('/api/login', {
        username: username,
        password: password
    })
    console.log("here", response.data)
    window.localStorage.setItem("userToken", `bearer ${response.data.token.toString()}`)
    setUser(response.data.name)
    return response.data
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
      <div>
          username
          <input 
          type='text' 
          value={username} 
          onChange={({target}) => {
              setUserName(target.value)
          }
          } ></input>
      </div>
      <div>
          password
          <input 
          type='password'
          value={password} 
          onChange={({target}) => setPassword(target.value)} >
          </input>
      </div>
      <button> login </button>
      </form>
    </div>
  )

  const loginInfo = () => (
    <div>
      <pre>
        {user} logged in
        <button onClick={handleLogOut} >log out</button>
      </pre>
    </div>
  )

  const handleCreate = async (event) => {
    event.preventDefault()

    const config = {
      headers: {Authorization: window.localStorage.getItem('userToken')}
    }
    
    const response = await axios.post('/api/blogs', {
      title: title,
      author: author,
      url: url
    }, config)

    setTitle('')
    setAuthor('')
    setUrl('')

    return response.data
    
  }

  const createPart = () => (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleCreate} >
        <div>
          title:
          <input type="text" name="title" value={title} onChange={({target}) => setTitle(target.value)} ></input>
        </div>
        <div>
          author:
          <input type="text" name="author" value={author} onChange={({target}) => setAuthor(target.value)} ></input>
        </div>
        <div>
          url:
          <input type="text" name="url" value={url} onChange={({target}) => setUrl(target.value)} ></input>    
        </div>
        <button>create</button>
      </form>
    </div>
  )

  const handleLogOut = () => {
    window.localStorage.removeItem('userToken')
    setUser('')
    setUserName('')
    setPassword('')
  }

  return (
    <div>
      {user ? null : loginForm()}
      <h2>blogs</h2>
      <h3>
        {user ? loginInfo() : null}
        {user ? createPart() : null}
      </h3>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App