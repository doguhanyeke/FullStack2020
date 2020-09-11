import React, {useState} from 'react'
import axios from 'axios'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [detailVisible, setdetailVisible] = useState(false)
  const [currentBlog, setCurrentBlog] = useState(blog)
  
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
    setCurrentBlog(response.data)
  }

  return(
    <div style={blogStyle}>
      {currentBlog.title} {currentBlog.author}
      <button onClick={() => setdetailVisible(true)}>view</button>
      <div style={showDetails}>
        <ul>
          <li>
            {currentBlog.url}
            <button onClick={() => setdetailVisible(false)}>hide</button>
          </li>
          <li>
            {currentBlog.likes}
            <button onClick={increaseLikeofBlog}>like</button>
          </li>
          <li>
            {currentBlog.user ? currentBlog.user.name : null}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Blog
