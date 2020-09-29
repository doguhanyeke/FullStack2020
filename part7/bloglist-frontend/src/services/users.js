import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/users'

const getAll = () => {
  const res = axios.get(baseUrl)
  return res.then(response => response.data)
}

export default { getAll }