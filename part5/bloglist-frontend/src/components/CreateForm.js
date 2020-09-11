import React, {useState} from 'react'
import axios from 'axios'

const CreateForm = ({
    handleCancelClick,
    setPostMessage
    }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreate = async (event) => {
        event.preventDefault()
        const config = {
          headers: {Authorization: window.localStorage.getItem('userToken')}
        }
        
        const response = await axios.post('/api/blogs', {
          title: title,
          author: author,
          url: url
        }, config)
    
        setPostMessage(`a new blog ${response.data.title} added`)
        setTimeout(() => {
          setPostMessage('')
        }, 5000)
    
        setTitle('')
        setAuthor('')
        setUrl('')
    
        return response.data
    }
  
    return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleCreate} >
        <div>
          title:
          <input type="text" name="title" value={title} onChange={({target}) => setTitle(target.value)} ></input>
        </div>
        <div>
          author:
          <input type="text" name="author" value={author} onChange={({target}) => setAuthor(target.value)} ></input>
        </div>
        <div>
          url:
          <input type="text" name="url" value={url} onChange={({target}) => setUrl(target.value)} ></input>    
        </div>
        <button>create</button>
      </form>
      <button onClick={handleCancelClick} >cancel</button>
    </div>
    )
}

export default CreateForm