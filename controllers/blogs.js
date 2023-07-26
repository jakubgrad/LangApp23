const notesRouter = require('express').Router()
const Blog = require('../models/blog')
const axios = require('axios')

notesRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})
  
notesRouter.post('/', async (request, response) => {
	body = request.body
	if(!body.hasOwnProperty('title') || !body.hasOwnProperty('url')) {
		response.status(400).send()
	} else {
		const blog = new Blog({...request.body, likes:request.body.likes || 0})
		const savedBlog = await blog.save()   
		response.status(201).json(savedBlog)
	}
})

notesRouter.get('/letters/displayallwords/:firstTwoLetters', (req, res) => {
	const firstTwoLetters = req.params.firstTwoLetters;
	const file = require(`./letters/${firstTwoLetters}/${firstTwoLetters}.json`)
	let words = file["words"].map(w => w.word)
	res.json(words);  
})

notesRouter.get('/letters/:firstTwoLetters/:word', (req, res) => {
	const firstTwoLetters = decodeURI(req.params.firstTwoLetters)
	const word = decodeURI(req.params.word)
	console.log(`notesRouter.get: firstTwoLetters:${firstTwoLetters}, word:${word}`);
	const file = require(`./letters/${firstTwoLetters.toLowerCase()}/${firstTwoLetters.toLowerCase()}.json`)
	//you can make the search better by looking into possible forms of words.
	//Look in the screenshots for example of forms of viikonloppuisin
	let answer = file["words"].find(w => w.word === word)
	console.log(answer);
	if (answer) {
		res.json(answer);  
	} else {
		//res.send("s");
			res.status(404).send({
			message: 'This is an error!'
		 });
		/*console.log("ss");
		const endpoint = `http://127.0.0.1:5000/ping`;
		const response = 
			axios
			.get(endpoint)
			.then(response => res.send(response))
			.catch(err => res.send("ds"))
		//const file = response.data;
		//response.
		*/
	}  
})


/*
notesRouter.get('/:id', async (request, response, next) => {
	const blog = await Blog.findById(request.params.id)
	if (blog) {
		response.json(blog)
	} else {
		response.status(404).end()
	}
  
})
*/
/*
notesRouter.get('/:firstLetter/:word', (req, res) => {
  const { firstLetter, word } = req.params;
  //const partitionFile = `./data/${firstLetter.toUpperCase()}.json`;
	const partitionFile = "db.json"
  // Load the JSON partition file for the given first letter
  
    const partitionData = require("./db.json");
    //const wordInfo = partitionData[word.toLowerCase()];
    let answer = partitionData.words.find(w => w.word === "'ansik")
    //answer = partitionData
//    answer = partitionData.words.map(o => o.senses)
	res.json(answer);
    //if (wordInfo) {
    
})
*/

notesRouter.get('/fin/allwords/', (req, res) => {
	//const { firstLetter, word } = req.params;
	//const partitionFile = `./data/${firstLetter.toUpperCase()}.json`;
	// Load the JSON partition file for the given first letter
	
	  const partitionData = require("./finfirst12kwords.json");
	  //const wordInfo = partitionData[word.toLowerCase()];
	  let answer = partitionData["words"].map(w => w.word)
	  //answer = partitionData
	//    answer = partitionData.words.map(o => o.senses)
	  res.json(answer);
	  //if (wordInfo) {
	  
})

  
notesRouter.get('/fin2/:firstTwoLetters/:word', (req, res) => {
	const { firstTwoLetters, word } = req.params;
	//const partitionFile = `./data/${firstLetter.toUpperCase()}.json`;
	// Load the JSON partition file for the given first letter
	
	  const partitionData = require(`./${firstTwoLetters}/${firstTwoLetters}.json`);
	  //const wordInfo = partitionData[word.toLowerCase()];
	  let answer = partitionData.words.find(w => w.word === "aasi")
	  //answer = partitionData
	//    answer = partitionData.words.map(o => o.senses)
	  res.json(answer);
	  //if (wordInfo) {
	  
})

notesRouter.get('/fin/allwordslong/', (req, res) => {
	//const { firstLetter, word } = req.params;
	//const partitionFile = `./data/${firstLetter.toUpperCase()}.json`;
	// Load the JSON partition file for the given first letter
	
	  const partitionData = require("./finfirst12kwords.json");
	  //const wordInfo = partitionData[word.toLowerCase()];
	  let answer = partitionData["words"]
	  //answer = partitionData
	//    answer = partitionData.words.map(o => o.senses)
	  res.json(answer);
	  //if (wordInfo) {
	  
})

notesRouter.get('/fin/:firstLetter/:word', (req, res) => {
	const { firstLetter, word } = req.params;
	//const partitionFile = `./data/${firstLetter.toUpperCase()}.json`;
	// Load the JSON partition file for the given first letter
	
	  const partitionData = require("./finfirst12kwords.json");
	  //const wordInfo = partitionData[word.toLowerCase()];
	  let answer = partitionData.words.find(w => w.word === "-Vntua")
	  //answer = partitionData
	//    answer = partitionData.words.map(o => o.senses)
	  res.json(answer);
	  //if (wordInfo) {
	  
})

  

notesRouter.delete('/:id', async (request, response, next) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

module.exports = notesRouter
