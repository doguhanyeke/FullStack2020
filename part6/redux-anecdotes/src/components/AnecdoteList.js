import React from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { notifMesAction, removeNotifMes } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const anecdoteCompare = (anec1, anec2) => {
    return anec1.votes > anec2.votes ? -1 : 1
  }

  const vote = (id, content) => {
    dispatch(voteAction(id))
    dispatch(notifMesAction(`You Voted '${content}'`))
    setTimeout( () => {
      dispatch(removeNotifMes())
    }, 5000)
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
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList