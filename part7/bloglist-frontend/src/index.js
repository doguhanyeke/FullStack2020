import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import createFormReducer from './reducers/createFormReducer'

import { createStore } from 'redux'

const reducer = (state={}, action) => {
  return {
    notificationMessage: notificationReducer(state.notificationMessage, action),
    blogForm: createFormReducer(state.blogForm, action)
  }
}
const store = createStore(
  reducer
)

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('root'))