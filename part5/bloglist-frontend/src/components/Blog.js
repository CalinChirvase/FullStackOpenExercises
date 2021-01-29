import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, setBlogs }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeBlog = async () => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user

    }
    await blogService.update(blog.id, newBlog)
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
        {visible ?
          <div>
            {blog.url}
            <br/>
            {blog.likes} <button onClick={likeBlog}>like</button>
            <br />
            {blog.user.username}
          </div> :
          ''}
      </div>
    </div>
  )
}

export default Blog
