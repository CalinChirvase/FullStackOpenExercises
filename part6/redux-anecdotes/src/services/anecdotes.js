import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNewAnecdote = async (content) => {
  const anecdote = { 
    content: content,
    votes: 0 }
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const updateVote = (id, votedAnecdote) => {
  const request = axios.put(`${ baseUrl }/${id}`, votedAnecdote)
  return request.then(response => response.data)
}

export default { 
  getAll,
  createNewAnecdote,
  updateVote
}