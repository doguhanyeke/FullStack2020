import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdoteAction } from '../reducers/anecdoteReducer'
import { notifMesAction, removeNotifMes } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''  
    anecdoteService.create(
      {
        content: content,
        votes: 0
      }
    ).then(response => {
      dispatch(createAnecdoteAction(response.content))
      dispatch(notifMesAction(`Anecdote of '${response.content}' created`))
      setTimeout(() => {
        dispatch(removeNotifMes())
      }, 5000)  
    })
  }
  
  return (
    <div>
    <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm