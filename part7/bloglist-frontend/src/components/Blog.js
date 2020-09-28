import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { updateBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, userId }) => {
  const dispatch = useDispatch()

  const [detailVisible, setdetailVisible] = useState(false)
  const [currentBlog, setCurrentBlog] = useState(blog)

  const blogStyle = {
    display: currentBlog.id !== '' ? '' : 'none',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showDetails = { display: detailVisible ? '' : 'none' }

  const increaseLikeofBlog = async () => {
    const newBlog = {
      user: currentBlog.user ? currentBlog.user._id : '',
      likes: currentBlog.likes ?  + currentBlog.likes + 1 : 1,
      author: currentBlog.author,
      title: currentBlog.title,
      url: currentBlog.url
    }
    setCurrentBlog(newBlog)
    dispatch(updateBlog(newBlog))
  }

  const handleRemoveBlog = async () => {
    if (window.confirm(`Remove blog ${currentBlog.title} by ${currentBlog.author}`)){
      dispatch(removeBlog(currentBlog.id))
      setCurrentBlog({
        title: '',
        author: '',
        url: '',
        likes: 0,
        user: {
          username: '',
          name: '',
          id: ''
        },
        id: ''
      })
      setdetailVisible(false)
    }
  }

  console.log("current blog", currentBlog)
  const removeStyle = {
    display: currentBlog.user && userId === currentBlog.user.id ? '' : 'none'
  }

  return(
    <div style={blogStyle} className='blog'>
      {currentBlog.title} {currentBlog.author}
      <button className='viewHideButton' onClick={() => setdetailVisible(!detailVisible)}>{detailVisible ? 'hide' : 'view'}</button>
      <div className='blog-details' style={showDetails}>
        <ul>
          <li className='url-li' >
            {currentBlog.url}
          </li>
          <li className='likes-li' >
            {currentBlog.likes}
            <button className='likeButton' onClick={increaseLikeofBlog}>like</button>
          </li>
          <li>
            {currentBlog.user ? currentBlog.user.name : null}
          </li>
          <div style={removeStyle}>
            <button onClick={handleRemoveBlog}>remove</button>
          </div>
        </ul>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired
}

export default Blog