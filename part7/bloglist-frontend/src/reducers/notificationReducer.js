
export const setNotificationMessage = (message) => {
  return {
    type: 'SET_NOTIFICATION_MESSAGE',
    data: message
  }
}

const notificationReducer = (state='', action) => {
  switch(action.type) {
    case('SET_NOTIFICATION_MESSAGE'): {
      return action.data
    }
    default:
      return state
  }
}

export default notificationReducer