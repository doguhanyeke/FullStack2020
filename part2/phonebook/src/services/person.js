import axios from 'axios'

const baseUrl = 'https://shrouded-earth-30493.herokuapp.com/api/persons'

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