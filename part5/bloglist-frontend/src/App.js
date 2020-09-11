import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import axios from 'axios'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [loginMessage, setLoginMessage] = useState('')
  const [createFormVisible, setCreateFormVisible] = useState(false)
  const [postMessage, setPostMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [postMessage])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("handle login")
    let response = null
    try{
      response = await axios.post('/api/login', {
        username: username,
        password: password
      })
    } catch {
      setLoginMessage('wrong username or password')
      setTimeout(() => {
        setLoginMessage('')
        setUserName('')
        setPassword('')
      }, 5000)
      return
    }
    
    window.localStorage.setItem("userToken", `bearer ${response.data.token.toString()}`)
    setUser(response.data.name)
    return response.data
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification message={loginMessage} />
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

  const handleLogOut = () => {
    window.localStorage.removeItem('userToken')
    setUser('')
    setUserName('')
    setPassword('')
  }

  const loginInfo = () => (
    <div>
        {user} logged in
        <button onClick={handleLogOut} >log out</button>
    </div>
  )

  const createForm = () => {
    const hideWhenVisible = {display: createFormVisible ? 'none': ''}
    const showWhenVisible = {display: createFormVisible ? '': 'none'}
    return(
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateFormVisible(true)}>new note</button>
        </div>
        <div style={showWhenVisible}>
          <CreateForm 
            handleCancelClick={() => setCreateFormVisible(false)}
            setPostMessage={setPostMessage}
          />
        </div>
      </div>
    )
  }

  function compare(a, b) {
    if(a.likes > b.likes) return -1
    if(b.likes > a.likes) return 1
    return
  }

  return (
    <div>
      {user ? null : loginForm()}
      <h2>blogs</h2>
      <h3>
        <Notification message={postMessage}/>
        {user ? loginInfo() : null}
        {user ? createForm() : null}
      </h3>
      {blogs.sort(compare).map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App