import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { fireEvent, prettyDOM} from '@testing-library/dom'
import Blog from './Blog'

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

  const button = component.container.querySelector(".view-hide-button")
  fireEvent.click(button)

  expect(component.container.querySelector('.blog-details')).not.toHaveStyle('display: none')
})

test('Props should be called twice', () => {
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

  const viewButton = component.container.querySelector('.view-hide-button')
  fireEvent.click(viewButton)

  const likeButton = component.container.querySelector('.like-button')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(updateBlogs.mock.calls).toHaveLength(2)
})