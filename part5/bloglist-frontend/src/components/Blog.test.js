import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('Blog author and title displayed, but url and likes not', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 0
  }
  const userId = '5f5bdfb98a0ab6f55910ebb9'
  const updateBlogs = jest.fn()
  const component = render(
    <Blog blog={blog} userId={userId} updateBlogs={updateBlogs}/>
  )

  expect(component.container.querySelector('.blog')).not.toHaveStyle('display: none')
  expect(component.container.querySelector('.blog-details')).toHaveStyle('display: none')
})

test('When only view-button clicked, url and likes shown', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 0
  }
  const userId = '5f5bdfb98a0ab6f55910ebb9'
  const updateBlogs = jest.fn()
  const component = render(
    <Blog blog={blog} userId={userId} updateBlogs={updateBlogs}/>
  )

  const button = component.container.querySelector(".viewHideButton")
  fireEvent.click(button)

  expect(component.container.querySelector('.blog-details')).not.toHaveStyle('display: none')
})

test('Props should be called twice', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
  }
  const userId = '5f5bdfb98a0ab6f55910ebb9'
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} userId={userId} updateBlogs={mockHandler}/>
  )
  /*
  const likeButton = component.container.querySelector('.likeButton')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  */

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  console.log(prettyDOM(component.container.querySelector('.blog')))

  expect(mockHandler.mock.calls).toHaveLength(2)
})