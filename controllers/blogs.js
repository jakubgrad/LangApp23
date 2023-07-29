const notesRouter = require('express').Router()
const Text = require('../models/blog')

//return all books in the database, for debugging
notesRouter.get('/', async (request, response) => {
	const texts = await Text.find({})
	response.json(texts)
})

//gives titles of books in the database
notesRouter.get('/booklist', (request, response) => {
	Text.find({}).then(entries => {
		const titles = entries.map(e => e.title) 
		response.send(titles)
	}).catch(err => console.log('Failed to send titles', err))
})

//returns a single book by it's title
notesRouter.get('/book/:title', (request, response) => {
	const title = request.params.title
	Text.find({title:title}).then(entries => {
		const result = entries.find(e => e.title === title) 
		response.send(result)
	}).catch(err => console.log('Failed to send the book', err))
})

//creates a new book, this address is used by frontend entries.js
notesRouter.post('/mongonew', (request, response, next) => {
	const body = request.body

	if (body.title === undefined || body.author === undefined) {
		return response.status(400).json({ error: 'name or number missing' })
	}

	const text = new Text({
		title:body.title,
		author:body.author,
		pages: {
			'1':body.pages['1']
		},
		pageTranslations: {
			'1':body.pageTranslations['1']
		}
	})
	console.log('text: ', text)

	text.save()
		.then(savedEntry => {
			response.json(savedEntry)
		})
		.catch(error => next(error))
})

//displays all words starting with chosen two letters! Debugging utility
notesRouter.get('/letters/displayallwords/:firstTwoLetters', (req, res) => {
	const firstTwoLetters = req.params.firstTwoLetters
	const file = require(`./letters/${firstTwoLetters}/${firstTwoLetters}.json`)
	let words = file['words'].map(w => w.word)
	res.json(words)
})

//Used for getting a word directly from the wiktionary database of words
notesRouter.get('/letters/:firstTwoLetters/:word', (req, res) => {
	const firstTwoLetters = decodeURI(req.params.firstTwoLetters)
	const word = decodeURI(req.params.word)
	console.log(`notesRouter.get: firstTwoLetters:${firstTwoLetters}, word:${word}`)
	const file = require(`./letters/${firstTwoLetters.toLowerCase()}/${firstTwoLetters.toLowerCase()}.json`)
	//can make the search better by looking into possible forms of words when simple search fails.
	let answer = file['words'].find(w => w.word === word)
	console.log(answer)
	if (answer) {
		res.json(answer)
	} else {
		res.status(404).send({
			message: 'This is an error!'
		})
	}  
})

module.exports = notesRouter
