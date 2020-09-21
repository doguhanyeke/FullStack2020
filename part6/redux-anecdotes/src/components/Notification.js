import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
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