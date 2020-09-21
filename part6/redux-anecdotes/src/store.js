import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'

const reducer = combineReducers({
  anecdoteReducer
})

const Store = createStore(
  reducer,
  composeWithDevTools
)

export default Store