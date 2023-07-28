import React from 'react';
import './index.css';
import { useState } from 'react'
import BookList from './components/BookList';
import entryService from './services/entries'
import Word from './Word'
import axios from 'axios'

const Blog = (props) => {
  const [chosenWord, setChosenWord ] = useState('')
  const [boxOnTheRight, setBoxOnTheRight ] = useState('')
  console.log(boxOnTheRight);
  const exampleBook = props.text
  console.log("blog", exampleBook);
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
        <h1>{exampleBook.title}</h1>
        <p>
          {exampleBook.pages["1"].split(" ")
          .map(
            (word, index) => 
            (<Word key = {index} word = {word} fetchWordDescription = {fetchWordDescription}/>)
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