import axios from 'axios'
const baseUrl = '/api/blogs'

//basic request to backend for a clicked word, requested from Blog.js
const getWord = (word) => {
  const wo = word.toLowerCase().slice(0, 2)
  const request = axios.get(`/api/blogs/letters/${wo.toLowerCase()}/${word.toLowerCase()}`)
  return request.then(response => response.data).catch(err => console.log("Could not get the word in the given form", err))
}

//request to return all books in database, unused
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

//returns titles of books, used in BookList.js
const getBookList = () => {
  const request = axios.get(`${baseUrl}/booklist`)
  return request.then(response => response.data)
}

//get full information about a book
const getBySearch = (title) => {
  const request = axios.get(`${baseUrl}/book/${title}`)
  return request.then(response => response.data)
}

//get full information about a book
const getBook = (title) => {
  const request = axios.get(`${baseUrl}/book/${title}`)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(`${baseUrl}/mongonew`, newObject)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { 
  getAll, 
  create, 
  getWord,
  getBookList,
  getBook,
  getBySearch
}