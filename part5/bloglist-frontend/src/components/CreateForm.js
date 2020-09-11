import React from 'react'

const CreateForm = ({
    handleCreate,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    title,
    author,
    url,
    handleCancelClick
}) => {
    return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleCreate} >
        <div>
          title:
          <input type="text" name="title" value={title} onChange={handleTitleChange} ></input>
        </div>
        <div>
          author:
          <input type="text" name="author" value={author} onChange={handleAuthorChange} ></input>
        </div>
        <div>
          url:
          <input type="text" name="url" value={url} onChange={handleUrlChange} ></input>    
        </div>
        <button>create</button>
      </form>
      <button onClick={handleCancelClick} >cancel</button>
    </div>
    )
}

export default CreateForm