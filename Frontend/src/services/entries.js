import axios from 'axios'
const baseUrl = '/api/notes'
//langApp
const getWord = (word) => {
  const wo = word.slice(0, 2)
  const request = axios.get(`api/blogs/letters/${wo}/${word}`)
  return request.then(response => response.data).catch(err => console.log("Could not get the word in the given form", err))
}

//old
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteById = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { 
  getAll, 
  create, 
  update,
  deleteById,
  getWord
}