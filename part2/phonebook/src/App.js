import React, { useState } from 'react'
import Phonebook from './components/Phonebook'
import ContactForm from './components/ContactForm'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter] = useState('')

  const addPerson = (event) =>{
    event.preventDefault()

    const matches = persons.filter(person => person.name === newName)
    if (matches.length !== 0){
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    console.log('hi', personObject)
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleAddName = (event) =>{
    setNewName(event.target.value)
  }

  const handleAddNumber = (event) =>{
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) =>{
    setNewFilter(event.target.value)
  }

  return (  
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Filter shown with: <input value={newFilter} onChange={handleNewFilter}/>
        </div>
      </form>
      <ContactForm newName={newName} handleAddName={handleAddName} newNumber={newNumber} handleAddNumber={handleAddNumber} addPerson={addPerson}/>
      <Phonebook persons={persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))}/>
    </div>
  )
}

export default App