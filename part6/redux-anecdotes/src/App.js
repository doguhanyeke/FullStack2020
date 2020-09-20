import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAnecdoteAction , voteAction } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const anecdoteCompare = (anec1, anec2) => {
    return anec1.votes > anec2.votes ? -1 : 1
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''  
    dispatch(createAnecdoteAction(content))
  }

  const vote = (id) => {
    dispatch(voteAction(id))
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
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App