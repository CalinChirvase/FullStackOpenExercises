import React from 'react'

const ContactForm = ({ newName, handleAddName, newNumber, handleAddNumber, addContact }) => {
    return (
        <form>
            <h2>Add a new contact</h2>
            <div>
                name: <input value={newName} onChange={handleAddName}/>
            </div>
            <div>number: <input value={newNumber} onChange={handleAddNumber}/></div>
            <div>
                <button type="submit" onClick={addContact} >add</button> 
            </div>
        </form>
    )
  }

export default ContactForm