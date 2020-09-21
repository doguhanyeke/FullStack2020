import React from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { setNotification, removeNotifMes } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filterContent = useSelector(state => state.filter)
  const filteredAnecdotes = anecdotes.filter(anec => anec.content.includes(filterContent))
  const dispatch = useDispatch()

  const anecdoteCompare = (anec1, anec2) => {
    return anec1.votes > anec2.votes ? -1 : 1
  }

  const vote = ({id, content, votes}) => {
    console.log("votessss:", id, content, votes)
    dispatch(voteAction({id, content, votes}))
    dispatch(setNotification(`You Voted '${content}'`, 5000))
  }

  return (
    <div>
      {filteredAnecdotes.sort(anecdoteCompare).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList