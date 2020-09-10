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
    window.localStorage.setItem("userToken", response.data.token.toString())
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
              console.log("hade", target.value)
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

  console.log(username, password)

  return (
    <div>
      {user ? null : loginForm()}
      <h2>blogs</h2>
      <pre>
        {user ? `${user} logged in` : null}
      </pre>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App