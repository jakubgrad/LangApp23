import { useState, useEffect } from 'react'
import Entry from './components/Entry'
import Notification from './components/Notification'
import entryService from './services/entries'
import Blog from './Blog'
//import FileUpload from './FileUpload'
import TopNavBar from './TopNavBar'
import FileUpload from './FileUpload'
import OldFileUpload from './oldFileUpload'
import BookList from './components/BookList';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams } from 'react-router-dom';

  function About() {
    return (
      <div>
        <TopNavBar />
        <div style={{ padding: 20 }}>
          <h2>About</h2>
          <p>
            Welcome to my website!
            This website provides a unique feature that allows you to upload a PDF file and 
            read it online. But that's not all! There's an extra touch of magic to enhance 
            your reading experience.
          </p>
          <p>
            When you view the PDF on our website, you can click on any word in the document, 
            and a translation and description of that word will magically appear in the box right next 
            to it! This is thanks to a powerful mage, the Wiktionary database that provides the website with 
            instant definitions and insights.
          </p>
          <p>
            This is a very early stage of the website and perhaps only a proof of concept. Nevertheless,
            it is possible to upload a pdf file and then see it on the "book shelf" on the left side of the page
            (just remember to refresh!)
          </p>
          <p>
          <a className="githublink" target="_blank" style={{ color: "blue"}} href = "https://github.com/jakubgrad/LangApp23">The whole code of the website is publicly available on Github.</a> For questions or suggestions, please don't hesitate to 
            contact me via the "Contact" link in the navigation bar. <br></br>Happy reading!<br></br>Jakub Grad
          </p>
        </div>
      </div>
    );
  }

  function Contact() {
    return (
      <div>
        <TopNavBar />
        <div style={{ padding: 20 }}>
          <h2>Contact</h2>
          <p>
          <a className="githublink" target="_blank" style={{ color: "blue"}} href="mailto:jakub.grad@icloud.com">jakub.grad@icloud.com</a>
          </p>
          <p>
            <a className="githublink" target="_blank" style={{ color: "blue"}} href="https://www.linkedin.com/in/jakub-grad-880543242/"> Linkedin</a>
          </p>
          <p>
            <a className="githublink" target="_blank" style={{ color: "blue"}} href="https://github.com/jakubgrad"> Github</a>
          </p>
        </div>
      </div>
    );
  }

const Home = () => {
  console.log("Wgat");
  return (
    <div style={{ padding: 20 }}>
      <h2>Home View</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

function Post() {
  const { slug } = useParams();
  //const post = BlogPosts[slug];
  //if(!post) {
   // return <span>The blog post you've requested doesn't exist.</span>;
  //}
  //const { title, description } = post;
  return (
    <div style={{ padding: 20 }}>
      <h3>{slug}</h3>
      <p>bruh</p>
    </div>
  );
}

const Main = () => {
  const { slug } = useParams();
  console.log(slug);
//  const localDevelopment = process.env.LOCAL_DEVELOPMENT //doesnt work
  //console.log(`Local development: ${localDevelopment}`);
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
        console.log(" connection successful");
        setEntries(initialEntries)
      })
      .catch(err => console.log("Couldn't connect",err))
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
    
    <div className="main-content">
    <TopNavBar />
    
    <Blog title = {slug}/>
    </div>
    
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
          */
         
    }
    </div>
  )
}

const App = () => {
  return (
    <Router>
      <Routes>
        {/*<Route path="/" element={<Main />} />*/}
        <Route path="frontend/book/:slug" element={<Main />} />
        <Route path="frontend/about" element={<About />} />
        <Route path="frontend/upload" element={<FileUpload />} />
        <Route path="frontend/contact" element={<Contact />} />
      </Routes>
    </Router>
  )
}

export default App
