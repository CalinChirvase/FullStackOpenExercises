import React from 'react'
import Contact from './Contact'

const Phonebook = ({ persons, deleteContact }) =>{
    return(
        <div>
            <h2>Numbers </h2>
            <ul> {persons.map(person => <Contact key={person.name} 
            name={person.name} number={person.number} deleteContact={() => deleteContact(person.id)}
            />)}
            </ul>
        </div>
    )
}


export default Phonebook