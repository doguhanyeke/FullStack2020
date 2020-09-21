export const setNotification = (message, timeDuration) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIF_MESSAGE',
      data: message
    })
    setTimeout( () => {
      dispatch(removeNotifMes())
    }, timeDuration)   
  }
}

export const removeNotifMes = () => {
  return {
    type: 'SET_NOTIF_MESSAGE',
    data: ''
  }
}

const reducer = (state='', action) => {
  switch(action.type) {
    case('SET_NOTIF_MESSAGE'): {
      return action.data
    } 
    default:
      return state
  }
}

export default reducer