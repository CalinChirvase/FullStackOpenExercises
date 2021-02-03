export const setNotification = (notification, seconds) => {
  return async dispatch => {
    setTimeout(() => dispatch(removeNotification()), seconds * 1000)
    dispatch({
      type: 'SET',
      notification: notification
    })
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE',
    notification: ''
  }
}

const notificationReducer = (state = '', action) => {
  const notification = action.notification

  switch(action.type) {
  case 'SET':
    return notification
  case 'REMOVE':
    return notification
  default:
    return state
  }
}

export default notificationReducer