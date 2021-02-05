import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('by default renders title and author but not url and likes', () => {
  const blog = {
    author: 'Wellington Beef',
    title: 'Wheres the Beef?',
    url: 'beef.ca',
    likes: 1
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(blog.author)
  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).not.toHaveTextContent(blog.url)
  expect(component.container).not.toHaveTextContent(blog.likes)
})

test('renders url and likes when view button is clicked', () => {

  const user = {
    username: 'ItsMe'
  }

  const blog = {
    author: 'Wellington Beef',
    title: 'Wheres the Beef?',
    url: 'beef.ca',
    likes: 1,
    user: user
  }

  const component = render(
    <Blog blog={blog} />
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  expect(component.container).toHaveTextContent(blog.url)
  expect(component.container).toHaveTextContent(blog.likes)
})

test('clicking the like button twice calls event handler twice', () => {

  const user = {
    username: 'ItsMe'
  }
  const blog = {
    author: 'Wellington Beef',
    title: 'Wheres the Beef?',
    url: 'beef.ca',
    likes: 1,
    user: user
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} setBlogs={mockHandler} />
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})