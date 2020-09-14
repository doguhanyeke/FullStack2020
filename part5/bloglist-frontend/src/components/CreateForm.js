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
      <form onSubmit={handleCreate} >
        <div>
          title:
          <input type="text" name="title" value={title} onChange={({ target }) => setTitle(target.value)} ></input>
        </div>
        <div>
          author:
          <input type="text" name="author" value={author} onChange={({ target }) => setAuthor(target.value)} ></input>
        </div>
        <div>
          url:
          <input type="text" name="url" value={url} onChange={({ target }) => setUrl(target.value)} ></input>
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

CreateForm.propTypes = {
  createNewNote: PropTypes.func.isRequired,
  setPostMessage: PropTypes.func.isRequired
}

export default CreateForm