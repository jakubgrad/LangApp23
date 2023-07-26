const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
  
beforeEach(async () => {
	await Blog.deleteMany({})
	for (let blog of helper.initialBlogs) {
		let blogObject = new Blog(blog)
		await blogObject.save()
	}
})

//4.8: Blog list tests, step1 two tests below
test('all blogs are returned', async () => {
	const blogsAtEnd = await helper.blogsInDb()

	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

//4.9: Blog list tests, step2 one test below
test('Unique identifier property of the blog posts is named id', async () => {
	const blogsAtStart = await helper.blogsInDb()
	expect(blogsAtStart.map(blog => blog._id)).toBeDefined()
})

//4.10: Blog list tests, step3 the test below
test('a valid blog can be added', async () => {
	const newBlog = {"title":"Mourning","author":"Djaba","url":"scifistuff","likes":0}
  
	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)
  
	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
	const titles = blogsAtEnd.map(n => n.title)
	expect(titles).toContain(
		'Mourning'
	)
})


//4.11*: Blog list tests, step4 one test below
test('if likes property is missing, it defaults to 0', async () => {
	const newBlog = {"title":"Mourning","author":"Djaba","url":"scifistuff"}
    
	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)
    
	const blogsAtEnd = await helper.blogsInDb()
	const lastBlog = blogsAtEnd[helper.initialBlogs.length]
	expect(lastBlog.likes).toBe(0)
    
})

//4.12*: Blog list tests, step5 the two tests below
test('blog without title is not added', async () => {
	const newBlog = {"author":"Horse","url":"charger","likes":3}
	//const newBlog = {"title":"Mouse","author":"Horse","url":"charger","likes":3}
  
	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)
  
	const blogsAtEnd = await helper.blogsInDb()
  
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})
  
test('blog without url is not added', async () => {
	const newBlog = {"title":"Mouse","author":"Horse","likes":3}
    
	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)
    
	//const response = await api.get('/api/blogs')
	const blogsAtEnd = await helper.blogsInDb()
    
	//expect(response.body).toHaveLength(helper.initialBlogs.length)
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

/*
test('there are two (a correct number) blogs', async () => {
	const blogsAtEnd = await helper.blogsInDb()
  
	expect(blogsAtEnd).toHaveLength(2)
})
*/

test('the first blog has Melboor as the author', async () => {
	const blogsAtEnd = await helper.blogsInDb()
  
	expect(blogsAtEnd[0].author).toBe('Melboor')
})

test('a specific blog can be viewed', async () => {
	const blogsAtStart = await helper.blogsInDb()
  
	const blogToView = blogsAtStart[0]
  
	const resultBlog = await api
		.get(`/api/blogs/${blogToView._id}`)
		.expect(200)
		.expect('Content-Type', /application\/json/)
  
	expect(JSON.stringify(resultBlog.body)).toBe(JSON.stringify(blogToView))
})
  
test('a blog can be deleted', async () => {
	const blogsAtStart = await helper.blogsInDb()
	const blogToDelete = blogsAtStart[0]
  
	await api
		.delete(`/api/blogs/${blogToDelete._id}`)
		.expect(204)
  
	const blogsAtEnd = await helper.blogsInDb()
  
	expect(blogsAtEnd).toHaveLength(
		helper.initialBlogs.length - 1
	)
  
	const titles = blogsAtEnd.map(r => r.title)
  
	expect(titles).not.toContain(blogToDelete.title)
})

afterAll(async () => {
	await mongoose.connection.close()
})



afterAll(async () => {
	await mongoose.connection.close()
})



//lots of comments for beforeEach, but only for beforeEach
//beforeEach(async () => {
//	await Blog.deleteMany({})
/*console.log('cleared')
    helper.initialBlogs.forEach(async (blog) => {
        let blogObject = new Blog(blog)
        await blogObject.save()
        console.log('saved')
    })
    console.log('done')
    */
/*
    const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
    */
/*
    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
        }
    */
/*
	let blogObject = new Blog(helper.initialBlogs[0])
	await blogObject.save()
	blogObject = new Blog(helper.initialBlogs[1])
	await blogObject.save()
    */
/*
  await Note.deleteMany({})

  for (let note of helper.initialNotes) {
    let noteObject = new Note(note)
    await noteObject.save()
    }
    */
//})

/*
test('blog without likes property has 0 likes', async () => {
const newBlog = {"title":"Mouse","author":"Horse","likes":3}

await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

const response = await api.get('/api/blogs')

expect(response.body).toHaveLength(helper.initialBlogs.length)
})
*/