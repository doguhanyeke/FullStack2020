import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

/*
const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notificationMessage: notificationReducer
})
*/

const reducer = function(state={}, action ) {
  return {
    anecdotes: anecdoteReducer(state.anecdotes, action),
    notificationMessage: notificationReducer(state.notificationMessage, action),
    filter: filterReducer(state.filter, action)
  }
}

const store = createStore(
  reducer,
  composeWithDevTools()
)

export default store