import React from 'react'

const Contact = ({ name, number , deleteContact}) => {
    return (
      <div>
        <p>{name} {number} <button type="submit" onClick={deleteContact}> delete </button></p>
      </div>
    )
  }

export default Contact