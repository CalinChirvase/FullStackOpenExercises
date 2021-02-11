import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = ({ show }) => {

  const [genreParameter, setGenreParameter] = useState('')
  
  const currentUser = useQuery(
    ME,
    {
      onCompleted: (data) => {
        setGenreParameter(data.me.favoriteGenre)
        getBooks()
      }
    })
  const [recommendations, setRecommendations] = useState(null)
  const [getBooks, result] = useLazyQuery(
    ALL_BOOKS,
    { variables: { genre: genreParameter } }
  )

  useEffect(() => {
    if (result.data) {
      setRecommendations(result.data.allBooks)
    }
  }, [result, genreParameter])

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>

      <p>books in your favorite genre: {genreParameter}</p>

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
          {recommendations ?
          recommendations.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )
          : getBooks()}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations