import { useState, useEffect } from 'react'
import Entry from './components/Entry'
import Notification from './components/Notification'
import entryService from './services/entries'
import Blog from './Blog'
import FileUpload from './FileUpload'
import TopNavBar from './TopNavBar'


const App = () => {
  const localDevelopment = process.env.LOCAL_DEVELOPMENT //doesnt work
  console.log(`Local development: ${localDevelopment}`);
  const exampleBook = require('./exampleBook.json') 
  console.log(exampleBook);
  const [entries, setEntries] = useState([
  {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    entryService
      .getAll()
      .then(initialEntries => {
        console.log("MongoDB connection successful");
        setEntries(initialEntries)
      })
  }, [])

  const addEntry = (event) => {
    event.preventDefault()

    const entryObject = {
      name: newName,
      number: newNumber,
    }

    if(entries.find(entry => entry.name === newName)) {
      console.log("Name already in database!")
      const entry = entries.find(entry => entry.name === newName)
      const id = entry.id
      entryService
        .update(id, entryObject).then(returnedEntry => {
          setEntries(entries.map(entry => entry.id !== id ? entry : returnedEntry))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          const error_message = "400 (Bad request). " + error.response.data.error
          setErrorMessage(
            error_message
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

        })

    } else {
    entryService
      .create(entryObject)
        .then(returnedEntry => {
        setEntries(entries.concat(returnedEntry))
        setNewName('')
      })
      .catch(error => {
        const error_message = "400 (Bad request). " + error.response.data.error
        setErrorMessage(
          error_message
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
        
      

    }
  
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

    const deleteById = id => { 
      entryService
        .deleteById(id).then(returnedEntry => { 
          console.log("Delete entry of id $ { id } ??", returnedEntry);
          setEntries(entries.filter(entry => entry.id !== id))
        })
    }

  return (
    <div>
    <TopNavBar />
    <Blog text = {exampleBook}/>
    <FileUpload />
    {
      /*
      <Notification message={errorMessage} />
      <ul>
        <ul>
          {entries.map(entry => 
            <Entry
              key={entry.id}
              entry={entry}
              deleteById={() => deleteById(entry.id)}
            />
          )}
        </ul>
      </ul>
      <form onSubmit={addEntry}>
        <input placeholder="Name" value={newName} onChange={handleNameChange} />
        <input placeholder="Number" value={newNumber} onChange={handleNumberChange} />
        <button type="submit">save</button>
      </form>
          */}
    </div>
  )
}

export default App
