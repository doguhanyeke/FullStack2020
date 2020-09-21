export const notifMesAction = (message) => {
  return {
    type: 'SET_NOTIF_MESSAGE',
    data: message
  }
}

const defaultMes = ''
const reducer = (state=defaultMes, action) => {
  switch(action.type) {
    case('SET_NOTIF_MESSAGE'): {
      return action.data
    } 
    default:
      return state
  }
}

export default reducer