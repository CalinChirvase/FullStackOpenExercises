import React from 'react'

const ContactForm = ({ newName, handleAddName, newNumber, handleAddNumber, addPerson }) => {
    return (
        <form>
            <h2>Add a new contact</h2>
            <div>
                name: <input value={newName} onChange={handleAddName}/>
            </div>
            <div>number: <input value={newNumber} onChange={handleAddNumber}/></div>
            <div>
                <button type="submit" onClick={addPerson} >add</button> 
            </div>
        </form>
    )
  }

export default ContactForm