import React, { useState } from 'react'
const Blog = ({ blog, likeBlog }) => {
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

  const updateBlogs = () => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user

    }
    likeBlog(blog.id, newBlog)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
        {visible === true ?
          <div>
            {blog.url}
            <br/>
            {blog.likes} <button onClick={updateBlogs()}>like</button>
            <br />
            {console.log(blog.user)}
            {blog.user.username}
          </div> :
          ''}
      </div>
    </div>
  )
}

export default Blog
