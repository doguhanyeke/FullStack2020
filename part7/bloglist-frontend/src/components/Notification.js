import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  console.log("eski mesaj", message)
  if(message !== ''){
    return (
      <div>
        {message}
      </div>
    )
  }
  return(null)
}

Notification.propTypes = {
  message: PropTypes.string.isRequired
}

export default Notification