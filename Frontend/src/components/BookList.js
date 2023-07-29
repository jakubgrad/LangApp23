// BookList.js
import React, { useEffect, useState } from 'react';
//import './BookList.css';
import stylesBookList from './BookList.module.css';
import entryService from '../services/entries';

const BookList = () => {
  const [titles, setTitles] = useState([])
  useEffect(() => {
    entryService
      .getBookList()
      .then(initialTitles => {
        console.log(" BookList grab successful");
        setTitles(initialTitles)
      })
      .catch(err => console.log("Couldn't connect to get titles",err))
  }, [])
  return (
    <div className={stylesBookList['book-list']}>
      <h3>Books on the shelf</h3>
      <ul>
        {titles.length === 0
        ? <li>Loading...</li>
        :
          titles.map(
            (title, index) => 
            (<a href = {`/frontend/book/${title}`}><li key = {index}>{title}</li></a>)
          )
        }
        {/* Add more book names as needed */}
      </ul>
    </div>
  );
};

export default BookList;
