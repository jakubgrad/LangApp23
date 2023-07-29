import Blog from './Blog'
//import FileUpload from './FileUpload'
import TopNavBar from './components/TopNavBar'
import FileUpload from './FileUpload'
import About from './components/About'
import Contact from './components/Contact'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams } from 'react-router-dom';

const MainPage = () => {
  const { slug } = useParams(); //slug is part of URL after frontend/book/
  const exampleBook = require('./exampleBook.json') 

  return (
    <div>
    <div className="main-content">
    <TopNavBar />
    <Blog title = {slug}/>
    </div>
    </div>
  )
}

const App = () => {
  return (
    <Router>
      <Routes>
        {/*<Route path="/" element={<Main />} />*/}
        <Route path="frontend/book/:slug" element={<MainPage />} />
        <Route path="frontend/about" element={<About />} />
        <Route path="frontend/upload" element={<FileUpload />} />
        <Route path="frontend/contact" element={<Contact />} />
      </Routes>
    </Router>
  )
}

export default App
