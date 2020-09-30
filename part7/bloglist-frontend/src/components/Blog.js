import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [comments, setComments] = useState(blog && blog.comments ? blog.comments : [])
  
  if(!blog){
    return null
  }
  console.log("blog: ", blog.comments)

  const increaseLikeofBlog = async () => {
    dispatch(updateBlog({...blog, likes: blog.likes + 1}))
  }

  const addComment = (event) => {
    event.preventDefault()
    console.log("gel")
    const comment = event.target.comment.value
    console.log("id, comment", blog.id, comment)
    blogService.addComment(blog.id, {comment: comment})
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
      
      <p>comments</p>
      <form onSubmit={addComment} >
        <input name='comment'></input>
        <button type='submit'>add comment</button>
      </form>

      <ul>
        {blog.comments.map((comment, index) =>
        <li key={index}>{comment}</li>
        )}
      </ul>
    </div>
  )
}

export default Blog