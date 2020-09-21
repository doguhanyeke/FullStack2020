export const notifMesAction = (message) => {
  return {
    type: 'SET_NOTIF_MESSAGE',
    data: message
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