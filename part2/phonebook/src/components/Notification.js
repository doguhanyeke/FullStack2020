import React from 'react'
import './Notification.css'

const Notification = ({ message, className }) => {
    console.log("here", className)
    if(message === null){
        return null
    }

    return (
        <div className={className}>
            {message}
        </div>
    )
}

export default Notification