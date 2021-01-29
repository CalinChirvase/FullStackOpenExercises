import React, { useState } from 'react'

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
      <form onSubmit={addBlog}>
        <div>
            title
          <input
            id='blog-title'
            type="text"
            value={title}
            name="Title"
            onChange={handleChangeTitle}
          />
        </div>
        <div>
            author
          <input
            id='blog-author'
            type="text"
            value={author}
            name="Author"
            onChange={handleChangeAuthor}
          />
        </div>
        <div>
            url
          <input
            id='blog-url'
            type="text"
            value={url}
            name="URL"
            onChange={handleChangeURL}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm