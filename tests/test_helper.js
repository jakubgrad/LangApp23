const Blog = require('../models/blog')

const initialBlogs = [
	{"title":"Shining","author":"Melboor","url":"hhtpsomelink","likes":20},
	{"title":"Computers","author":"aComputerPerson","url":"adifferentjswebpage","likes":3}
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}