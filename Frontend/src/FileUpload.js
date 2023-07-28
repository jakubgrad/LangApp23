import React, { useState } from 'react';
import entries from './services/entries';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [statusOfUpload, setStatusOfUpload] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleMongo = () => {
    const text = {
      "title":"Mongoid",
      "author":"fellow kid",
      "pages": {
        "1":"Hansin tavallinen päivä. aakkosellisuus Aakko Herään arkisin aina kello 7. Pidän rauhallisista aamuista, joten herään yleensä ajoissa. Viikonloppuisin saatan nukkua hieman pidempään. Aamulla teen aamupalaa ja keitän kahvin. Aamupalaa syön lukiessa päivän lehteä. Yleensä syön kaurapuuroa lisukkeilla, mutta joskus saatan tehdä voileivän tai syödä jugurttia myslillä.Sitten vaihdan vaatteet ja valmistaudun työpäivään. Työpäivä alkaa kello 9, joten lähden kotoa aina kello 8:30. Menen töihin linja-autolla. Aamuisin on yleensä ruuhkaa ja bussi on melkein aina täynnä. Joskus olen töissä vasta kello 9:10. Päivällä käyn työkavereiden kanssa lounaalla ravintolassa. Olen töissä kello 17 asti. Onneksi en jää koskaan ylitöihin. Töiden jälkeen hoidan usein keskustassa asioita, käyn kaupassa tai tapaan ystäviä. Sitten menen kotiin. Joskus käyn illalla kuntosalilla, katson televisiota tai luen kirjaa. Joskus teen vähän töitä kotona illalla. Joko minä tai tyttöystäväni tekee illallisen - yleensä vuorottelemme. Illalla katsomme aina kymmenen uutiset ja sen jälkeen aloitamme iltapuuhat ja menemme nukkumaan."  
    },
    "pageTranslations": {
        "1":{
            "Hansin":"Hansi",
            "tavallinen":"tavallinen",
            "päivä":"päivä"
        }
    }
    }
    entries
      .create(text)
      .then(res =>
        console.log("Response from handle mongo: ",res))
      .catch(err => 
        console.log("Handle mongo failed: ",err))
  }

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      if (newAuthor == '' || newTitle == '') {
        return
      }
      //const endpoint = `http://127.0.0.1:5000/upload`
      const endpoint = `https://langapp23flask.onrender.com/upload`;
      fetch(endpoint, {
        method: 'POST',
        body: formData,
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Access the response from Flask
        console.log("data.message, ", data.message); 
        console.log("data.dict, ", data.dict); 
        console.log("data.text, ", data.text); 
        setStatusOfUpload(data.message)
        const text = {
          "title":newTitle,
          "author":newAuthor,
          "pages": {
            "1":data.text  
        },
        "pageTranslations": {
            "1":data.dict
        }
      }
        entries
          .create(text)
          .then(res =>
            console.log("Response from handle mongo: ",res))
          .catch(err => 
            console.log("Handle mongo failed: ",err))
        
        // You can update the React state or perform any other actions based on the response.
      })
        .catch((error) => {
          console.error('Error occurred while uploading the file:', error);
        });
    }
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }


  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  return (
    <div>
      <p>{statusOfUpload}</p>
      <input type="file" onChange={handleFileChange} />
      <input onChange= { handleAuthorChange} type='text' placeholder='Author'/>
      <input onChange= { handleTitleChange} type='text' placeholder='Title'/>
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleMongo}>Mongo!</button>
    </div>
  );
}

export default FileUpload;