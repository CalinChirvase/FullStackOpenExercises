const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id: id
    }
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'CREATE',
    data
  }
}

export const initializeAnecdotes = (anectodes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anectodes
  }
}

const anecdoteReducer = (state = [], action) => {

  switch(action.type) {
  case 'VOTE':
    const id = action.data.id
    const anecdoteToVote= state.find(anecdote => anecdote.id === id)
    const votedAnecdote = {
      ...anecdoteToVote, votes: anecdoteToVote.votes + 1
    }
    return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)
  case 'CREATE':
    const content = action.data.content
    const anecdote = asObject(content)
    return state.concat(anecdote)
  case 'INIT_ANECDOTES':
    return action.data
  default:
    return state
  }
}

export default anecdoteReducer