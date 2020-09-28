export const setUserID = (userID) => {
  return {
    type: 'SET_USER_ID',
    data: userID
  }
}

const userReducer = (state='', action) => {
  switch(action.type){
    case('SET_USER_ID'): {
      return action.data
    }
    default:
      return state
  }
}

export default userReducer