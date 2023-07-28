import React from 'react';
import './index.css';
import { useState, useEffect } from 'react'
import BookList from './components/BookList';
import entryService from './services/entries'
import Word from './Word'
import axios from 'axios'
//import { response } from 'express';

const Blog = (props) => {

  
  const title = props.title
  const exampleBook = require('./exampleBook.json') 
  const [chosenWord, setChosenWord ] = useState('')
  const [dict, setDict ] = useState(null)
  const [book, setBook ] = useState(exampleBook)
  const [boxOnTheRight, setBoxOnTheRight ] = useState('')
  console.log(boxOnTheRight);

  useEffect(() => {
    entryService
    .getBook(title)
    .then(response => {
      console.log("GetBook succeeded!");
      console.log(response);
      if(response !== '') {
        console.log("response has something");
        console.log("response.pages");
        console.log("response.pages[1]", response.pages[1]);
        console.log(`response.pages["1"]`, response.pages["1"]);
        setBook(response)
      } else {
      console.log("response empty");
    }
    })
    .catch(err => console.log("GetBook failed"))
  }, [])


  

  const fetchWordDescription = (word) => {
    entryService
    .getWord(word)
    .then(response => {
      if( response === undefined) {
        console.log("Could not fetch word description using this form of the word", word)
      //const endpoint = `http://127.0.0.1:5000/pygetword/${encodeURI(word)}`;
      const endpoint = `https://langapp23flask.onrender.com/pygetword/${encodeURI(word)}`;
      console.log(`Sending requests to ${endpoint}`);
      axios.get(endpoint)
        .then(response => {
          //console.log("respone: ", response);
          console.log("respone data: ", response.data);
          const file = response.data["word"];
          console.log(file); // Sending the file data as the response
          entryService
          .getWord(word)
          .then(response => {
            console.log(response)
            setBoxOnTheRight(JSON.stringify(response))
          })
        })
        .catch(err => {
          console.error('Error occurred again', err);
        });
      } else {
        console.log("Response from engine", response)
        setBoxOnTheRight(JSON.stringify(response))
      }
    })
    .catch(err => {
      
console.log("caught an error in connecting through entryService");

    })
  }
  return (
    <div className="container">
      <BookList />
      <div className="content">
        <h1>{book.title}</h1>
        <p>
          {book.pages[1].split(" ")
          .map(
            (word, index) => 
            (<Word key = {index} word = {word} base = {book.pageTranslations[1][word]} fetchWordDescription = {fetchWordDescription}/>)
          )}
        </p>
        {/* Add more paragraphs as needed */}
      </div>
      <div className="box">
        <h2>{boxOnTheRight}Box on the right</h2>
        <p>bb{boxOnTheRight}</p>
      </div>
    </div>
  );
};

export default Blog;