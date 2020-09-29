import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import createFormReducer from './reducers/createFormReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import { BrowserRouter as Router } from 'react-router-dom'

const reducer = (state={}, action) => {
  return {
    notificationMessage: notificationReducer(state.notificationMessage, action),
    blogForm: createFormReducer(state.blogForm, action),
    blogs: blogReducer(state.blogs, action),
    userID: userReducer(state.userID, action)
  }
}
const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App/>
    </Provider>
  </Router>, document.getElementById('root'))