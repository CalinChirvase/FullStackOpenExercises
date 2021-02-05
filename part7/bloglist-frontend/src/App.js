import React, { useState, useEffect, useRef } from 'react'

//import components
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import NavigationBar from './components/NavigationBar'
import UserView from './components/UserView'

//import services
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'


import { Table,  Alert } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  //get all blogs
  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs(blogs)
      )
  }, [])

  //get all users
  useEffect(() => {
    userService
      .getAll()
      .then(users =>
        setUsers(users)
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`Welcome ${user.name}!`)
      setTimeout(() => {
        setMessage(null)
      }, 10000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {

    return (
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreateBlog = (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      blogService
        .create(blog)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
        })

    } catch (exception) {
      setErrorMessage('Failed to create new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => {
    return (
      <div>
        <br />
        <Togglable buttonLabel="Create a new blog" ref={blogFormRef}>
          <BlogForm handleCreateBlog={handleCreateBlog}/>
        </Togglable>
        <br />
        <Table striped>
          <tbody>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} setBlogs={setBlogs}/>
            )}
          </tbody>
        </Table>
      </div>
    )
  }

  return (
    <div className="container">
      <Router>
        {(message &&
          <Alert variant="success" dismissible>
            {message}
          </Alert>)}
        <div>{errorMessage}</div>

        {user === null ?
          loginForm() :
          <div>
            <NavigationBar user={user} handleLogout={handleLogout}/>
            <Switch>
              <Route path="/users/:id">
                <UserView user={user} setBlogs={setBlogs}/>
              </Route>
              <Route path="/users">
                <UserList users={users}/>
              </Route>
              <Route path="/blogs">
                {blogForm()}
              </Route>
              <Route path="/">
                Welcome!
              </Route>
            </Switch>
          </div>
        }
      </Router>
    </div>
  )
}

export default App