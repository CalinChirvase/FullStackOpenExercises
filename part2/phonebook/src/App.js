import React, { useState } from 'react'
import Phonebook from './components/Phonebook'
import ContactForm from './components/ContactForm'
import { useEffect } from 'react'
import contactService from './services/contacts'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 

  useEffect(() => {
    contactService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const [ notification, setNotification] = useState(null)

  const deleteContact = (id) => {

    const contact = persons.filter(person => person.id === id)

    if (window.confirm(`Delete ${contact[0].name}?`)) {
      contactService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
        setNotification(`${contact[0].name}'s phone number was succsesfully deleted.`)
        setTimeout(() => setNotification(null), 4000)
      })
      .catch(error => {
        setNotification(`${contact[0].name}'s phone number was already deleted.`)
        setPersons(persons.filter(person => person.id !== contact[0].id))
      }

      )
    }
  }

  const addContact = (event) =>{
    event.preventDefault()

    const matches = persons.filter(person => person.name === newName)
    if (matches.length !== 0){
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      setNewName('')
      setNewNumber('')
      
      if (result){
        const id = matches[0].id

        const newContact = {
          name: newName,
          number: newNumber,
          id: id
        }
        contactService
        .update(id, newContact)
        .then(response => {
          const updatedList = persons.filter(person => person.id !== id)
          setPersons(updatedList.concat(newContact))
        })
        .catch(error => {
          setNotification(`${newName}'s phone number was already deleted.`)
          setPersons(persons.filter(person => person.id !== id))
        }

        )
        setNotification(`${newName}'s phone number was succsesfully updated.`)
        setTimeout(() => setNotification(null), 4000)
        setNewName('')
        setNewNumber('')
        return
      }
    }

    const newContact = {
      name: newName,
      number: newNumber
    }

    contactService
    .create(newContact)
    .then(response => {
      setPersons(persons.concat(response))
      setNotification(`${newName}'s phone number was succsesfully added.`)
      setTimeout(() => setNotification(null), 4000)
      setNewName('')
      setNewNumber('')
    })
    .catch(error => {
      console.log(error.response.data)
    })
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
      <Notification message={notification} />
      <h2>Phonebook</h2>
      <form>
        <div>
          Filter shown with: <input value={newFilter} onChange={handleNewFilter}/>
        </div>
      </form>
      <ContactForm newName={newName} handleAddName={handleAddName} newNumber={newNumber} handleAddNumber={handleAddNumber} addContact={addContact}/>
      <Phonebook persons={persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))} deleteContact={deleteContact}/>
    </div>
  )
}

export default App