import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreateForm = ({ createNewNote, setPostMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    await createNewNote({
      title: title,
      author: author,
      url: url
    })
    setPostMessage(`a new blog ${title} added`)

    setTimeout(() => {
      setPostMessage('')
    }, 5000)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h3>Create New Blog</h3>
      <form className='form' onSubmit={handleCreate} >
        <div>
          title:
          <input id='titleId' className='titleInput' type="text" name="title" value={title} onChange={({ target }) => setTitle(target.value)} ></input>
        </div>
        <div>
          author:
          <input id='authorId' className='authorInput' type="text" name="author" value={author} onChange={({ target }) => setAuthor(target.value)} ></input>
        </div>
        <div>
          url:
          <input id='urlId' className='urlInput' type="text" name="url" value={url} onChange={({ target }) => setUrl(target.value)} ></input>
        </div>
        <button id='createButtonId' >create</button>
      </form>
    </div>
  )
}

CreateForm.propTypes = {
  createNewNote: PropTypes.func.isRequired,
  setPostMessage: PropTypes.func.isRequired
}

export default CreateForm