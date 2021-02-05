import React from 'react'
import Table from 'react-bootstrap/Table'
import Blog from './Blog'

const UserView = ({ user, setBlogs }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <br />
      <Table striped>
        <thead>
          <tr><b>Added Blogs</b></tr>
        </thead>
        <tbody>
          {user.blogs ?
            user.blogs.map(blog =>
              <Blog key={blog.id} blog={blog} setBlogs={setBlogs}/>
            ) :
            <tr><td>No Blogs Found</td></tr>
          }
        </tbody>
      </Table>
    </div>
  )
}

export default UserView