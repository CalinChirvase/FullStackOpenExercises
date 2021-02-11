import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useQuery } from '@apollo/client'
import { SET_BIRTH_YEAR, ALL_AUTHORS } from '../queries'

const Authors = ({ show }) => {
    const [born, setBorn] = useState('')
    const [name, setName] = useState('')
    const [selectedAuthor, setSelectedAuthor] = useState('default')
    const [ setBirthYear ] = useMutation(SET_BIRTH_YEAR, {
    refetchQueries: [ {query: ALL_AUTHORS} ]
    })

    const authorsResult = useQuery(ALL_AUTHORS)

    if (!show) {
    return null
    }

    if (authorsResult.loading) {
        return (
            <div>loading...</div>
        )
    }

    const submit = (event) => {
        event.preventDefault()
        if (selectedAuthor === "default") {
          return
        }

        const intBorn = parseInt(born)

        setBirthYear({
            variables: { name: name, setBornTo: intBorn }
        })

        setBorn('')
        setName('')
        setSelectedAuthor('default')
    }

    const handleChange = (event) => {
      setSelectedAuthor(event.target.value)
      setName(event.target.value)
    }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authorsResult.data.allAuthors.map(author =>
            <tr key={author.name}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
          <h2>Set Birth Year</h2>
          <form onSubmit={submit}>
            <div>
            Name
            <select onChange={handleChange} value={selectedAuthor}>
              <option value="default">Select an author</option>
              {authorsResult.data.allAuthors.map(author =>
              <option key={author.name} value={author.name}>{author.name}</option>)}
            </select>
            </div>
            <div>
            Born
            <input
                value={born}
                onChange={({ target }) => setBorn(target.value)}
            />
            </div>
            <button type="submit">Submit</button>
          </form>
      </div>

    </div>
  )
}

export default Authors