import React from 'react';
import './index.css';
import { useState } from 'react'
import entryService from './services/entries'
import Word from './Word'
import axios from 'axios'

const Blog = (props) => {
  const {chosenWord, setChosenWord } = useState('')
  const exampleBook = props.text
  console.log("blog", exampleBook);
  const fetchWordDescription = (word) => {
    entryService
    .getWord(word)
    .then(response => {
      console.log(response)
      if( response === undefined) {
        //console.log("undefined!!");
        console.log("Could not fetch word description using this form of the word", word)
      const endpoint = `http://127.0.0.1:5000/pygetword/${encodeURI(word)}`;
      axios.get(endpoint)
        .then(response => {
          //console.log("respone: ", response);
          console.log("respone data: ", response.data);
          const file = response.data["word"];
          console.log(file); // Sending the file data as the response
          entryService
          .getWord(word)
          .then(response => {
            console.log(response)})
        })
        .catch(err => {
          console.error('Error occurred again', err);
        });
      }
    })
    .catch(err => {
      
console.log("caught an error in connecting through entryService");

    })
  }
  return (
    <div className="container">
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
        <h2>Box on the Right</h2>
        <p>This is the box content.</p>
      </div>
    </div>
  );
};

export default Blog;