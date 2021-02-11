import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = ({ show }) => {
  
  const booksResult = useQuery(ALL_BOOKS)
  const currentUser = useQuery(ME)

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>

      <p>books in your favorite genre: {currentUser.data.me.favoriteGenre}</p>

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
          {booksResult.data.allBooks.filter(b => b.genres.includes(currentUser.data.me.favoriteGenre)).map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations