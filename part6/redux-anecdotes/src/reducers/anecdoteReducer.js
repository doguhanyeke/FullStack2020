import anecdotesService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const voteAction = (id) => {
  return {
    type: 'VOTE',
    id: id
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
      data: createdAnecdote
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

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  console.log('id', action.id)
  switch(action.type) {
    case('VOTE'): { 
      console.log(initialState)
      return state.map(stateElement => stateElement.id === action.id 
        ? {...stateElement, votes: stateElement.votes + 1}
        : stateElement)
    }
    case('CREATE_ANECDOTE'): {
      return [...state, {...action.data, id: getId() }]
    }
    case('INIT_ANECDOTES'): {
      return action.data
    }
    default:
      return state
  }
}

export default reducer
