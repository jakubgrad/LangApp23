import React from 'react';
import './index.css';
import { useState, useEffect } from 'react'
import BookList from './components/BookList';
import entryService from './services/entries'
import Word from './Word'
import axios from 'axios'
//import { response } from 'express';

const ComponentWithDescription = (props) => {
  console.log(`props.data: ${!props.data}`)
  const data = props.data
  console.log(`data: ${data}`);
  if (data === "start_value") {
    return <div>Description of the word will appear here!</div>;
  }
  if (!data || !data.senses || data.senses.length === 0) {
    // Handle the case when data or senses array is empty or undefined
    return <div>No valid data available for this word.</div>;
  }

  const { senses } = data;

  return (
    <div>
      <h2>{data.word.toUpperCase()}</h2>
      <h3>Meanings:</h3>
      {senses.map((sense, index) => (
        <div key={index}>
          {sense.glosses && sense.glosses.length > 0 ? (
            <ul>
              {sense.glosses.map((gloss, index) => (
                <li key={index}>{gloss}</li>
              ))}
            </ul>
          ) : (
            <p>No meanings available.</p>
          )}
        </div>
      ))}


{data.synonyms && data.synonyms.length > 0 ? (
  <>
  <h3>Synonyms:</h3>
  <ul>
    {data.synonyms.map((synonym, index) => (
      <li key={index}>{synonym.word}</li>
    ))}
  </ul></>
) : (
  <p>{/*No synonyms available.*/}</p>
)}
    </div>
  );
};

const Blog = (props) => { //Blog is called from App.js
  const title = props.title //title of wanted book
  console.log("slug aka title in Blog.js", title)
  const exampleBook = require('./exampleBook.json') 
  const [description, setDescription ] = useState('start_value')
  const [book, setBook ] = useState(exampleBook)
  // eslint-disable-next-line no-unused-vars
  const [clicked, setClicked ] = useState('') //for making the box on the right highlighted when a word is clicked

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
        console.log(`response.pageTranslations["1"]`, response.pageTranslations["1"]);
        setBook(response)
      } else {
      console.log("response empty");
    }
    })
    .catch(err => console.log("GetBook failed"))
  }, [])


  

  const fetchWordDescription = (word2) => {
    
    console.log("fetchWordDescription word2: ", word2);
    const word = book.pageTranslations[1][word2]
    console.log("fetchWordDescription word: ", word);
    console.log(word)
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
            setDescription(response)
          })
        })
        .catch(err => {
          console.error('Error occurred again', err);
        });
      } else {
        console.log("Response from engine", response)
        setDescription(response)
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
        <ComponentWithDescription data = {description} />
      </div>
    </div>
  );
};

export default Blog;