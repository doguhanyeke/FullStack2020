import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (personObject) => {
    return axios.post(baseUrl, personObject)
}

const update = (id, personObject) => {
    return axios.put(`${baseUrl}/${id}`, personObject)
}

const deleteP = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {getAll, create, update, deleteP}