const listHelper = require('../utils/list_helper')

describe("favorite blog", () => {
    test.only('of empty list is zero', () => {
		const blogs = []
		const result = listHelper.favoriteBlog(blogs)
		expect(result).toBe(0)
	})

    test.only('of multiple blogs has the most likes and matches format', () => {
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
            title: "How to print print",
            "author": "He",
            "url": "thatwebsitedotcom",
            likes: 20,
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
		const result = listHelper.favoriteBlog(blogs)
		expect(result).toEqual({
            title: "How to print print",
            author: "He",
            likes: 20,
            })
	})
})