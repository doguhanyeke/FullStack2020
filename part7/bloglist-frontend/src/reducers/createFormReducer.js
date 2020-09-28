
export const setTitle = (title) => {
  return {
    type: 'SET_TITLE',
    data: title
  }
}

export const setAuthor = (author) => {
  return {
    type: 'SET_AUTHOR',
    data: author
  }
}

export const setUrl = (url) => {
  return {
    type: 'SET_URL',
    data: url
  }
}

const initState = {
  title: '',
  author: '',
  url: ''
}

const createFormReducer = (state=initState, action) => {
  switch(action.type) {
    case('SET_TITLE'): {
      return {...state, title: action.data}
    }
    case('SET_AUTHOR'): {
      return {...state, author: action.data}
    }
    case('SET_URL'): {
      return {...state, url: action.data}
    }
    default:
      return state
  }
}

export default createFormReducer