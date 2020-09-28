import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import axios from 'axios'
import { setNotificationMessage } from './reducers/notificationReducer'
import { useSelector } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userId, setUserId] = useState('')

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs( blogs )
      )
  }, [])

  useEffect(() => {
    window.localStorage.removeItem('userToken')
  }, [])

  const createLogin = async (userInfo) => {
    const response = await axios.post('/api/login', userInfo)
    return response.data
  }

  const updateBlogs = (blog) => {
    setBlogs(blogs.map(b => b.id === blog.id ? blog : b))
  }

  const createNewNote = async (newNote) => {
    const config = {
      headers: { Authorization: window.localStorage.getItem('userToken') }
    }
    const response = await axios.post('/api/blogs', newNote, config)
    setBlogs(blogs.concat(response.data))
  }

  /*
  written for sort func
  */
  function compare(a, b) {
    if(a.likes > b.likes) return -1
    if(b.likes > a.likes) return 1
    return
  }

  /*
  Since the user needs to be logged in to make a create blog request,
  create note button is hiden from the view, when there is no user logged in.
  */
  const showCreateFormWhenUserAvailable = { display: userId !== '' ? '' : 'none' }

  console.log("state: ", useSelector(state => state))
  return (
    <div className='component' >
      <h1>blogs</h1>
      <h3>
        <Notification message={useSelector(state => state.notificationMessage)}/>
      </h3>
      <div className='loginForm' >
        <LoginForm
          createLogin={createLogin}
          setUserId={setUserId}
          setLoginMessage={setNotificationMessage}
        />
      </div>
      <div style={showCreateFormWhenUserAvailable}>
        <Togglable buttonLabel='create blog'>
          <CreateForm
            createNewNote={createNewNote}
            setBlogPostMessage={setNotificationMessage}
          />
        </Togglable>
      </div>

      <h3> All Blogs</h3>
      <div className='blogsComponent'>
        {blogs.sort(compare).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            userId={userId}
            updateBlogs={updateBlogs} />
        )}
      </div>
    </div>
  )
}

export default App