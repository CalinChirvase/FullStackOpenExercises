const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [
    {
        title: 'The Best Blog',
        author: 'Blogger McBlogg',
        url: 'thatblog.com',
        likes: 9001
    },
    {
        title: 'The Real Best Blog',
        author: 'Blogger OBlogger',
        url: 'thatrealblog.com',
        likes: 5
    }
]
beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
  
    const authors = response.body.map(r => r.author)
    expect(authors).toContain(
        'Blogger McBlogg'
    )
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Hello World!',
        author: 'Hello Worlder',
        url: 'hello.com',
        likes: 45782
    }
  
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain(
        'Hello World!'
    )
})

test('blog without author is not added', async () => {
    const newBlog = {
        title: 'Annonymous',
        url: 'secret.com',
        likes: 0
    }
  
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('blog without title and url is not added', async () => {
    const newBlog = {
        author: 'joker',
        likes: 0
    }
  
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('blog with no likes defaults to 0 likes', async () => {
    const newBlog = {
        title: 'NoLikeMe',
        author: 'KaptainKool',
        url: 'sad.com'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const likes = response.body.map(blog => blog.likes)

    expect(likes).toContain(0)
})

afterAll(() => {
    mongoose.connection.close()
})