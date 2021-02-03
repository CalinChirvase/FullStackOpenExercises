import anecdoteService from '../services/anecdotes'

export const voteAnecdote = (anecdoteToVote) => {
  return async dispatch => {
    const votedAnecdote = {
      ...anecdoteToVote, votes: anecdoteToVote.votes + 1
    }
    const reponse = await anecdoteService.updateVote(votedAnecdote.id, votedAnecdote)
    dispatch({
      type: 'VOTE',
      data: reponse
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNewAnecdote(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const anecdoteReducer = (state = [], action) => {

  switch(action.type) {
  case 'VOTE':
    return state.map(anecdote => anecdote.id !== action.data.id ? anecdote : action.data)
  case 'CREATE':
    return state.concat(action.data)
  case 'INIT_ANECDOTES':
    return action.data
  default:
    return state
  }
}

export default anecdoteReducer