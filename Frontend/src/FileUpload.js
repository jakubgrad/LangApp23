import React, { useState, useEffect } from 'react';
import entries from './services/entries';
import styles from './FileUpload.module.css';
import TopNavbar from './components/TopNavBar';


function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [statusOfUpload, setStatusOfUpload] = useState('Note! It might take a minute to upload and process your pdf file');
  const [newAuthor, setNewAuthor] = useState('');
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    // This effect will run when the statusOfUpload changes
    if (statusOfUpload === 'Uploading to flask server...' || statusOfUpload === 'Uploading to flask server..' || statusOfUpload === 'Uploading to flask server.' || statusOfUpload === 'Uploading to flask server') {
      // Start a timer to update the status message every second
      const timer = setInterval(() => {
        setStatusOfUpload((prevStatus) => {
          if (prevStatus.endsWith('...')) {
            return 'Uploading to flask server';
          }
          return prevStatus + '.';
        });
      }, 1000);

      // Clear the timer when the status changes to something else
      return () => clearInterval(timer);
    }
  }, [statusOfUpload]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      if (newAuthor === '' || newTitle === '') {
        return
      }
      setStatusOfUpload('Uploading to flask server...');
      const endpoint = `http://127.0.0.1:5000/upload`
      //const endpoint = `https://langapp23flask.onrender.com/upload`;
      //const endpoint = http://langapp23.ddns.net:3003/upload
      fetch(endpoint, {
        method: 'POST',
        body: formData,
      })
      .then((response) => response.json())
      .then((data) => {
        setStatusOfUpload('Upload completed successfully!');
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
          setStatusOfUpload('Upload failed! File took too long to process ( >90 seconds )')
          console.error('Error occurred while uploading the file:', error);
        });
    }
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  return (
    <div className={styles.container}>
      <TopNavbar/>
      <p className={statusOfUpload === "" ? "" : styles.status}>{
      statusOfUpload
      }</p>
      <div className={styles['input-group']}>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div className={styles['input-group']}>
        <input
          onChange={handleAuthorChange}
          type="text"
          placeholder="Author. Don't use spaces! Sorry..."
          value={newAuthor}
        />
        <input
          onChange={handleTitleChange}
          type="text"
          placeholder="Title, also with no spaces :o"
          value={newTitle}
        />
      </div>
      <div className={styles['input-group']}>
        <button onClick={handleUpload}>Upload</button>
        {/*<button onClick={handleMongo}>Mongo!</button>*/}
      </div>
    </div>
  );
}

export default FileUpload;
