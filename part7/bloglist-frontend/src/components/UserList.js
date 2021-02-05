import React, { useState } from 'react'
import User from './User'
import { Table, Button, Alert, Navbar, Nav } from 'react-bootstrap'

const UserList = ({ users }) => {
  return (
    <div>
      <br />
      <Table striped>
        <thead>
          <tr>
            <th>Username</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <User key={user.id} user={user}/>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList