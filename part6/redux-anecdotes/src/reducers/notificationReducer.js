export const setNotification = (notification) => {
  return {
    type: 'SET',
    notification: notification
    }
}

const notificationReducer = (state = '', action) => {
  const notification = action.notification

  switch(action.type) {
  case 'SET':
    return notification
  default:
    return state
  }
}

export default notificationReducer