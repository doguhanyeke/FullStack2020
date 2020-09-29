import React from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  if(!blog){
    return null
  }

  console.log("blog: ", blog)

  const increaseLikeofBlog = async () => {
    dispatch(updateBlog({...blog, likes: blog.likes + 1}))
  }
  return (
    <div>
      <strong>{blog.title} {blog.author} </strong>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      {blog.likes} likes
      <button onClick={increaseLikeofBlog}>like</button>
      <p>{blog.user ? blog.user.name : null}</p>
    </div>
  )
}

export default Blog