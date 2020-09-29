import React, { useEffect, useState } from 'react'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import axios from 'axios'
import { setNotificationMessage } from './reducers/notificationReducer'
import { initBlogs, addBlog } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import Users from './components/Users'
import userService from './services/users'

const App = () => {
  const dispatch = useDispatch()
  const userId = useSelector(state => state.userID)
  const [users, setUsers] = useState([])

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    userService.getAll().then(users => {
      setUsers(users)
      console.log("hio", users)
    }).catch(error => console.log("err", error))
  }, [])

  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    window.localStorage.removeItem('userToken')
  }, [])

  const handleLogin = async (userInfo) => {
    const response = await axios.post('http://localhost:3001/api/login', userInfo)
    return response.data
  }

  const createNewNote = (newBlog) => {
    dispatch(addBlog(newBlog))
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

  const returnNewBlog = (id) => {
    return blogs.find(blog => blog.id === id)
  }
  console.log("state: ", useSelector(state => state))
  return (
    <div className='container' >
      <h1>blogs</h1>
      <h3>
        <Notification message={useSelector(state => state.notificationMessage)}/>
      </h3>
      <div className='loginForm' >
        <LoginForm
          createLogin={handleLogin}
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
      <div>
        <Users users={users} />
      </div>


      <h3> All Blogs</h3>
      <div className='blogsComponent'>
        {blogs.sort(compare).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            userId={userId}
            returnNewBlog={returnNewBlog} />
        )}
      </div>
    </div>
  )
}

export default App