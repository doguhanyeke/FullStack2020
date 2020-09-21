import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notifMesAction } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notifMes = useSelector(store => store.notificationMessage)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notifMes}
    </div>
  )
}

export default Notification