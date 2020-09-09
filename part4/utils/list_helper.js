var _ = require('lodash')
const User = require('../models/user')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, element) => {
        return sum + element.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    var index = 0
    var maxLike = 0
    for(var i=0; i<blogs.length; i++){
        if(blogs[i].likes > maxLike){
            maxLike = blogs[i].likes
            index = i
        }
    }
    const returnedBlog = blogs[index]
    return returnedBlog
}

const blogs = [ 
    { _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0 
    },
    { _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0 
    },
    { _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0 
    },
    { _id: "5a422b891b54a676234d17fa", 
    title: "First class tests", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
    likes: 10, 
    __v: 0 
    }, 
    { _id: "5a422ba71b54a676234d17fb",
     title: "TDD harms architecture", 
     author: "Robert C. Martin", 
     url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
     likes: 0, 
     __v: 0 
    }, 
    { _id: "5a422bc61b54a676234d17fc", 
    title: "Type wars", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
    likes: 2, 
    __v: 0 
}]

const mostBlogs = (blogs) => {
    var reducedAuthorBlogs = _.reduce(blogs, function(result, blog) {
        if (result[blog.author]){
            result[blog.author] += 1
        } else {
            result[blog.author] = 1
        }
        return result
    }, {})
    var blogSize = 0
    var author = ''
    for(var aut in reducedAuthorBlogs){
        if(blogSize < reducedAuthorBlogs[aut]) {
            blogSize = reducedAuthorBlogs[aut]
            author = aut
        }
    }
    return {
        "author": author,
        "blogs": reducedAuthorBlogs[author]
    }
}

const mostLikes = (blogs) => {
    var reducedAuthorBlogs = _.reduce(blogs, function(result, blog) {
        if (result[blog.author]){
            result[blog.author] += blog.likes
        } else {
            result[blog.author] = blog.likes
        }
        return result
    }, {})
    var blogSize = 0
    var author = ''
    for(var aut in reducedAuthorBlogs){
        if(blogSize < reducedAuthorBlogs[aut]) {
            blogSize = reducedAuthorBlogs[aut]
            author = aut
        }
    }
    return {
        "author": author,
        "likes": reducedAuthorBlogs[author]
    }
}

const randomNumberGenerator = (maxNum) => {
    return (Math.random() * 10 < 5) ? 0 : 1
}

async function returnOneUser() {
    const result = await User.find({})
    return result[randomNumberGenerator(result.length)]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    returnOneUser
}