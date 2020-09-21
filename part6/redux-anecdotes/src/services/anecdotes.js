import axios from 'axios'


const getAll = async () => {
  const response = await axios.get('http://localhost:3001/anecdotes')
  return response.data
}

const create = async (anecdote) => {
  const response = await axios.post('http://localhost:3001/anecdotes', anecdote)
  return response.data
}

export default {
  getAll,
  create
}