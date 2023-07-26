const listHelper = require('../utils/list_helper')


describe("total likes", () => { 
	test('of empty list is zero', () => {
		const blogs = []
		const result = listHelper.totalLikes(blogs)
		expect(result).toBe(0)
	}) 
    test('when list has one blog equals the likes of that', () => {
		const blogs = [{
            "_id": "64ba7a50c8aad8952388612a",
            "title": "sit and look",
            "author": "Delegation",
            "url": "mouseandcat.fi",
            "likes": 2,
            "__v": 0
            }]
		const result = listHelper.totalLikes(blogs)
		expect(result).toBe(2)
	})
    test('of a bigger list is calculated right', () => {
		const blogs = [
            {
            "_id": "64ba4bd8290f0d617f349840",
            "title": "Web dev",
            "author": "Me",
            "url": "https",
            "likes": 3,
            "__v": 0
            },
            {
            "_id": "64ba7a2dc8aad89523886128",
            "title": "How to print print",
            "author": "He",
            "url": "thatwebsitedotcom",
            "likes": 20,
            "__v": 0
            },
            {
            "_id": "64ba7a50c8aad8952388612a",
            "title": "sit and look",
            "author": "Delegation",
            "url": "mouseandcat.fi",
            "likes": 2,
            "__v": 0
            }
            ]
		const result = listHelper.totalLikes(blogs)
		expect(result).toBe(25)
	})
})

