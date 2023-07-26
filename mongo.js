const mongoose = require('mongoose')
const Blog = require('./models/blog')

if (process.argv.length<3) {
  console.log('give password as argument and write t for connecting to test database, otherwise let 4th argument be anything but t')
  process.exit(1)
}

const password = process.argv[2]

const connectTestDatabase = process.argv[3] === "t" 
	? true
	: false

const url = connectTestDatabase 
  	? `mongodb+srv://fullstack:${password}@firstcluster.o20unys.mongodb.net/part4testing?retryWrites=true&w=majority`
	: `mongodb+srv://fullstack:${password}@firstcluster.o20unys.mongodb.net/part4?retryWrites=true&w=majority`

if (connectTestDatabase === true) {
	console.log("Connecting to test database ...")
} else {
	console.log("Connecting to part4 database");
}

mongoose.set('strictQuery',false)
mongoose.connect(url)

if (process.argv.length===4) {
	console.log('View only. Add arguments in the order: title, author, url, likes.')
	Blog.find({}).then(result => {
		result.forEach(note => {
		  console.log(note)
		})
		console.log('... title author url likes. Let the mongo connection close itself.')
		mongoose.connection.close()
	  })
} else {
	console.log('adding ...')
	const blog = new Blog({
		title: process.argv[4],
		author: process.argv[5],
		url: process.argv[6],
		likes: process.argv[7]
	})
	blog.save().then(result => {
		console.log('blog saved!')
		mongoose.connection.close()
	  })
	
}



/*
note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
*/

