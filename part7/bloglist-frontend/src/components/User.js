import React from 'react'
import { useParams } from 'react-router-dom'

const User = ({ user }) => {
  if(!user){
    return null
  }
  return(
    <div>
      <h2>
        {user.name}
      </h2>
      <h3>
        added blogs
      </h3>
      <div>
        {user.blogs.map(blog => 
        <li key={blog.id} >{blog.title}</li>
        )}
      </div>
    </div>
  )
}

export default User