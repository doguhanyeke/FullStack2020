import anecdotesService from '../services/anecdotes'

export const voteAction = (anecdote) => {
  return async (dispatch) => {
    console.log('vole: ', anecdote)
    const response = await anecdotesService.vote({...anecdote, votes: anecdote.votes + 1})
    dispatch({
      type: 'VOTE',
      data: response
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const createdAnecdote = await anecdotesService.create({
      content: content,
      votes: 0
    })
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: {
        content: createdAnecdote.content,
        votes: createdAnecdote.votes,
        id: createdAnecdote.id
      }
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  console.log('id', action.id)
  switch(action.type) {
    case('VOTE'): { 
      return state.map(stateElement => stateElement.id === action.data.id 
        ? {...stateElement, votes: stateElement.votes + 1}
        : stateElement)
    }
    case('CREATE_ANECDOTE'): {
      return [...state, action.data]
    }
    case('INIT_ANECDOTES'): {
      return action.data
    }
    default:
      return state
  }
}

export default reducer
