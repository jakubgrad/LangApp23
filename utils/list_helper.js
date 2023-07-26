const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	if (blogs.length === 0) {
		return 0
	} else {
        //return blogs[0]["likes"]
        return blogs.reduce((p, s) => s["likes"] + p, 0)
	}
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return 0
	} else {
        //return blogs[0]["likes"]
        const mostLikes = blogs.reduce((most, s) => most < s["likes"] ? s["likes"] : most, 0)
        const blog = blogs.find(b => b.likes === mostLikes)
        return {
            title: blog.title, 
            author: blog.author, 
            likes: blog.likes
        }
	}
}
  
module.exports = {
	dummy, totalLikes, favoriteBlog
}
