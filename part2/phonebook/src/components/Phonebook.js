import React from 'react'
import Contact from './Contact'

const Phonebook = ({ persons }) =>{
    return(
        <div>
            <h2>Numbers </h2>
            <ul> {persons.map(person => <Contact key={person.name} name={person.name} number={person.number}/>)}
            </ul>
        </div>
    )
}


export default Phonebook