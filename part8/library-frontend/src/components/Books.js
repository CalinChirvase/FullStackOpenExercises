import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const [genre, setGenre] = useState('all genres')
  
  const booksResult = useQuery(ALL_BOOKS)

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
        onChange={({ target }) => setGenre(target.value)}
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
          </tr>
          {genre ==='all genres'
          ? booksResult.data.allBooks.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )
          : booksResult.data.allBooks.filter(b =>
            b.genres.includes(genre)).map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
            )}
        </tbody>
      </table>
    </div>
  )
}

export default Books