import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNewAnecdote(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(setNotification('you created: '.concat(content)))
    setTimeout(() => dispatch(removeNotification()), 5000)

  }

  return (
    <div>
      <h2>create new anecdote</h2>
      <form onSubmit={create}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm