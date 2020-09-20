import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch({
      type: 'VOTE',
      id: id
    })
  }
  const create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: {
        content: content,
        votes: 0
      }
    })
  }

  const anecdoteCompare = (anec1, anec2) => {
    return anec1.votes > anec2.votes ? -1 : 1
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(anecdoteCompare).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App