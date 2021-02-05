import React, { useState } from 'react'
import blogService from '../services/blogs'
import { Button } from 'react-bootstrap'

const Blog = ({ blog, setBlogs }) => {
  const [visible, setVisible] = useState(false)

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
    <tr className='blog'>
      <td>
        {blog.title} by {blog.author} <Button variant="info" size="sm" onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</Button>
        {visible ?
          <div>
            URL: {blog.url}
            <br/>
            {blog.likes} likes <Button variant="info" size="sm" onClick={likeBlog}>like</Button>
            <br />
            Posted by {blog.user.username}
          </div> :
          ''}
      </td>
    </tr>
  )
}

export default Blog
