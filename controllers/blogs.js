const notesRouter = require('express').Router()
const Text = require('../models/blog')
const axios = require('axios')

notesRouter.get('/', async (request, response) => {
	const texts = await Text.find({})
	response.json(texts)
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

notesRouter.get('/mongo/', (request, response) => {
	Blog.find({}).then(entries => {
		const number = entries.length
		const date = new Date()
		response.send(`Phonebook has info for ${number} people <br/ > <br/ >${date}. Phonebook ${entries}`)
	}).catch(err => console.log("fial", err))
})

notesRouter.get('/booklist', (request, response) => {
	Text.find({}).then(entries => {
		const titles = entries.map(e => e.title) 
		response.send(titles)
	}).catch(err => console.log("Failed to send titles", err))
})

notesRouter.post('/mongonew', (request, response, next) => {
	const body = request.body

	if (body.title === undefined || body.author === undefined) {
		return response.status(400).json({ error: 'name or number missing' })
	}

	const text = new Text({
		title:body.title,
		author:body.author,
		pages: {
			"1":body.pages["1"]
		},
		pageTranslations: {
			"1":body.pageTranslations["1"]
		}
	})
	console.log("text: ", text);

	text.save()
		.then(savedEntry => {
			response.json(savedEntry)
		})
		.catch(error => next(error))
})

notesRouter.get('/mongop', (request, response, next) => {
	/*const body = request.body

	if (body.name === undefined || body.number === undefined) {
		return response.status(400).json({ error: 'name or number missing' })
	}
	*/
	const text = new Text({
		title:"Harry Spotter",
		author:"JK O.N.U. Rowling",
		pages: {
			"1":"Hansin tavallinen päivä. aakkosellisuus Aakko Herään arkisin aina kello 7. Pidän rauhallisista aamuista, joten herään yleensä ajoissa. Viikonloppuisin saatan nukkua hieman pidempään. Aamulla teen aamupalaa ja keitän kahvin. Aamupalaa syön lukiessa päivän lehteä. Yleensä syön kaurapuuroa lisukkeilla, mutta joskus saatan tehdä voileivän tai syödä jugurttia myslillä.Sitten vaihdan vaatteet ja valmistaudun työpäivään. Työpäivä alkaa kello 9, joten lähden kotoa aina kello 8:30. Menen töihin linja-autolla. Aamuisin on yleensä ruuhkaa ja bussi on melkein aina täynnä. Joskus olen töissä vasta kello 9:10. Päivällä käyn työkavereiden kanssa lounaalla ravintolassa. Olen töissä kello 17 asti. Onneksi en jää koskaan ylitöihin. Töiden jälkeen hoidan usein keskustassa asioita, käyn kaupassa tai tapaan ystäviä. Sitten menen kotiin. Joskus käyn illalla kuntosalilla, katson televisiota tai luen kirjaa. Joskus teen vähän töitä kotona illalla. Joko minä tai tyttöystäväni tekee illallisen - yleensä vuorottelemme. Illalla katsomme aina kymmenen uutiset ja sen jälkeen aloitamme iltapuuhat ja menemme nukkumaan."  
		},
		pageTranslations: {
			"1":{
				"Hansin":"Hansi",
				"tavallinen":"tavallinen",
				"päivä":"päivä"
			}
		}
	})

	text.save()
		.then(savedEntry => {
			response.json(savedEntry)
		})
		.catch(error => next(error))
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
