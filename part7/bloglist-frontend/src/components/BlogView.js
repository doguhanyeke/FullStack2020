import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, removeBlog } from '../reducers/blogReducer'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Blog = ({ blog, returnNewBlog }) => {
  const dispatch = useDispatch()
  const userId = useSelector(state => state.userID)

  const [detailVisible, setdetailVisible] = useState(false)

  const blogStyle = {
    display: blog.id !== '' ? '' : 'none',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showDetails = { display: detailVisible ? '' : 'none' }

  const increaseLikeofBlog = async () => {
     dispatch(updateBlog({...blog, likes: blog.likes + 1}))
  }

  const handleRemoveBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      dispatch(removeBlog(blog.id))
      setdetailVisible(false)
    }
  }
  
  const currentBlog = returnNewBlog(blog.id)
  const currentBlogUser = currentBlog.user.id ? currentBlog.user.id : currentBlog.user
  const removeStyle = {
    display: userId === currentBlogUser ? '' : 'none'
  }

  return(
    <div style={blogStyle} className='blog'>
      <Link to={`/blogs/${blog.id}`} >{blog.title} {blog.author}</Link>
      <Button className="float-sm-right" onClick={() => setdetailVisible(!detailVisible)}>{detailVisible ? 'hide' : 'view'}</Button>
      <div className='blog-details' style={showDetails}>
        <ul>
          <li className='url-li' >
            {blog.url}
          </li>
          <li className='likes-li' >
            {blog.likes}
            <button className='likeButton' onClick={increaseLikeofBlog}>like</button>
          </li>
          <li>
            {blog.user ? blog.user.name : null}
          </li>
          <div style={removeStyle}>
            <Button type='submit' onClick={handleRemoveBlog}>remove</Button>
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