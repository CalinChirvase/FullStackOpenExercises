const dummy = (blogs) => {
    
    return blogs.length + 1
}
  
const totalLikes = (blogs) => {

    const reducer = (accumulator, blog) => {
        return accumulator + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

module.exports = {
    dummy,
    totalLikes
}

/*
Define a new totalLikes function that receives a list of blog posts as a parameter. The function returns the total sum of likes in all of the blog posts.

Write appropriate tests for the function. It's recommended to put the tests inside of a describe block, so that the test report output gets grouped nicely:
*/