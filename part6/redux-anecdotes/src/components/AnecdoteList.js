import React from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const anecdoteCompare = (anec1, anec2) => {
    return anec1.votes > anec2.votes ? -1 : 1
  }
  return (
    <div>
      {anecdotes.sort(anecdoteCompare).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteAction(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList