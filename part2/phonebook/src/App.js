import React, { useState } from 'react'
import Phonebook from './components/Phonebook'
import ContactForm from './components/ContactForm'
import axios from 'axios'
import { useEffect } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([]) 

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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