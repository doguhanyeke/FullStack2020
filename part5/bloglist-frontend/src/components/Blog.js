import React, {useState} from 'react'
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [detailVisible, setdetailVisible] = useState(false)
  const showDetails = {display: detailVisible ? '' : 'none'}

  console.log(blog)
  
  console.log(blog.user)
  return(
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setdetailVisible(true)}>view</button>
      <div style={showDetails}>
        <ul>
          <li>
            {blog.url}
            <button onClick={() => setdetailVisible(false)}>hide</button>
          </li>
          <li>
            {blog.likes}
            <button>like</button>
          </li>
          <li>
            {blog.user ? blog.user.name : null}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Blog
