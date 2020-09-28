import blogService from '../services/blogs'

export const initBlogs = () => {
  return (async (dispatch) => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: data
    })
  })
}

export const addBlog = (blog) => {
  return async (dispatch) => {
    const data = await blogService.create(blog)
    console.log("gelen data: ", data)
    dispatch({
      type: 'CREATE_BLOG',
      data: data
    }
    )
  }
}

export const updateBlog = (blog) => {
  return async (dispatch) => {
    const data = await blogService.update(blog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: data
    })
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id
    })
  }
}

const blogReducer = (state=[], action) => {
  switch(action.type) {
    case('INIT_BLOGS'): {
      return action.data
    }
    case('CREATE_BLOG'): {
      return state.concat(action.data)
    }
    case('UPDATE_BLOG'): {
      return state.map(sta => sta.id === action.data.id ? action.data : sta)
    }
    case('REMOVE_BLOG'): {
      return state.filter(sta => sta.id !== action.data)
    }
    default:
      return state
  }
}

export default blogReducer