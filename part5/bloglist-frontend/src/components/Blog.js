import React, {useState} from 'react'
import axios from 'axios'

const Blog = ({ blog, userid }) => {
  const [detailVisible, setdetailVisible] = useState(false)
  const [currentBlog, setCurrentBlog] = useState(blog)

  const blogStyle = {
    display: currentBlog ? '' : 'none',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const showDetails = {display: detailVisible ? '' : 'none'}

  const increaseLikeofBlog = async () => {
    const newBlog = {
      user: currentBlog.user ? currentBlog.user._id : '',
      likes: currentBlog.likes ?  + currentBlog.likes + 1 : 1,
      author: currentBlog.author,
      title: currentBlog.title,
      url: currentBlog.url
    }
    const config = {
      headers: {Authorization: window.localStorage.getItem('userToken')}
    }
    const response = await axios.put(`/api/blogs/${currentBlog.id}`, newBlog, config)
    console.log(response.data)
    setCurrentBlog(response.data)
  }

  const handleRemoveBlog = async () => {
    if (window.confirm(`Remove blog ${currentBlog.title} by ${currentBlog.author}`)){
      const config = {
        headers: {Authorization: window.localStorage.getItem('userToken')}
      }
      const response = await axios.delete(`/api/blogs/${currentBlog.id}`, config)
      console.log(response.data)
      setCurrentBlog({})
      setdetailVisible(false)
    } 
  }
  console.log("here", userid, currentBlog.user.id)
  const removeStyle = {
    display: userid && currentBlog && userid === currentBlog.user.id.toString() ? '' : 'none'
  }

  return(
    <div style={blogStyle}>
      {currentBlog.title} {currentBlog.author}
      <button onClick={() => setdetailVisible(!detailVisible)}>{detailVisible ? 'hide' : 'view'}</button>
      <div style={showDetails}>
        <ul>
          <li>
            {currentBlog.url}
          </li>
          <li>
            {currentBlog.likes}
            <button onClick={increaseLikeofBlog}>like</button>
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

export default Blog
