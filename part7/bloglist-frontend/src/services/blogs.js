import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (blog) => {
  const config = {
    headers: {
      Authorization: window.localStorage.getItem('userToken')
    }
  }
  const res = axios.post(baseUrl, blog, config)
  return res.then(response => response.data)
}

const update = (blog) => {
  const config = {
    headers: {
      Authorization: window.localStorage.getItem('userToken')
    }
  }
  console.log("id:", blog)
  const res = axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return res.then(response => response.data)
}

const remove = (id) => {
  const config = {
    headers: {
      Authorization: window.localStorage.getItem('userToken')
    }
  }
  axios.delete(`${baseUrl}/${id}`, config)
  return
}

export default { getAll, create, update, remove }