import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ handleCreateBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handleChangeTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleChangeAuthor = (event) => {
    setAuthor(event.target.value)
  }

  const handleChangeURL = (event) => {
    setURL(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    handleCreateBlog({
      author: author,
      title: title,
      url: url
    })
    setTitle('')
    setAuthor('')
    setURL('')
  }

  return (
    <div className='formDiv'>
      <h2>Create a new blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="Title"
            placeholder="Enter a title"
            id="blog-title"
            value={title}
            onChange={handleChangeTitle}
          />
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            name="Author"
            placeholder="Enter an author here"
            id='blog-author'
            value={author}
            onChange={handleChangeAuthor}
          />
          <Form.Label>URL</Form.Label>
          <Form.Control
            type="text"
            name="URL"
            placeholder="Enter the blog url here"
            id='blog-url'
            value={url}
            onChange={handleChangeURL}
          />
          <br />
          <Button variant="primary" type="submit">Create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm