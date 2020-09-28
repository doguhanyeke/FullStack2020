import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setTitle, setAuthor, setUrl } from '../reducers/createFormReducer'

const CreateForm = ({ createNewNote, setBlogPostMessage }) => {
  const dispatch = useDispatch()

  let title = useSelector(state => state.blogForm.title)
  let author = useSelector(state => state.blogForm.author)
  let url = useSelector(state => state.blogForm.url)
  console.log("noluyor", title, author, url)

  const handleCreate = async (event) => {
    event.preventDefault()
    title = event.target.title.value
    author = event.target.author.value
    url = event.target.url.value

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    await createNewNote({
      title,
      author,
      url
    })


    dispatch(setBlogPostMessage(`a new blog ${title} added`))
    console.log("jo", title, author, url)
    setTimeout(() => {
      dispatch(setBlogPostMessage(''))
    }, 5000)
  }

  return (
    <div>
      <h3>Create New Blog</h3>
      <form className='form' onSubmit={handleCreate} >
        <div>
          title:
          <input id='titleId' className='titleInput' type="text" name="title" value={title} onChange={({ target }) => dispatch(setTitle(target.value))} ></input>
        </div>
        <div>
          author:
          <input id='authorId' className='authorInput' type="text" name="author" value={author} onChange={({ target }) => dispatch(setAuthor(target.value))} ></input>
        </div>
        <div>
          url:
          <input id='urlId' className='urlInput' type="text" name="url" value={url} onChange={({ target }) => dispatch(setUrl(target.value))} ></input>
        </div>
        <button id='createButtonId' >create</button>
      </form>
    </div>
  )
}

CreateForm.propTypes = {
  createNewNote: PropTypes.func.isRequired,
}

export default CreateForm