import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState('')
  
  //initial get of all books
  const booksResult = useQuery(
    ALL_BOOKS,
    {
      onCompleted: (data) => {
        setBooks(data.allBooks)
      }
    })

  //get new filtered set of books based on selected genre
  const [getBooks, result] = useLazyQuery(
    ALL_BOOKS,
    { variables: { genre: genre } }
  )

  const handleGenreChange = (value) => {
    setGenre(value)
    getBooks()
  }

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre</p>
      <input
        type="text"
        value={genre}
        onChange={({ target }) => handleGenreChange(target.value)}
      />
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
            <th>
              genres
            </th>
          </tr>
          {books.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
              <td>{b.genres.join()}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books