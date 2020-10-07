import React from 'react'

const Notification = ({ message }) => {

    const notificationStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
      }
      
    if (message === null) {
    return null
    }

    return (
      <div style={notificationStyle}>
        <p>{message}</p>
      </div>
    )
  }

export default Notification