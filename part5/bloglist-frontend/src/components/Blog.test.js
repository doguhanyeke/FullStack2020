import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { fireEvent, prettyDOM} from '@testing-library/dom'
import Blog from './Blog'
import CreateForm from './CreateForm'

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
    likes: 0
  }
  const userId = '5f5bdfb98a0ab6f55910ebb9'
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} userId={userId} updateBlogs={mockHandler}/>
  )

  const viewButton = component.container.querySelector('.viewHideButton')
  fireEvent.click(viewButton)

  const likeButton = component.container.querySelector('.likeButton')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  /*
  console.log(prettyDOM(component.container.querySelector('.blog')))
    */
  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('Form takes correct inputs', () => {
  const mockHandler1 = jest.fn()
  const mockHandler2 = jest.fn()
  const component = render(
    <CreateForm createNewNote={mockHandler1} setPostMessage={mockHandler2} />
  )
  let input = component.container.querySelector('.titleInput')
  fireEvent.change(input, {
    target: { value: 'test titssss' }
  })
  input = component.container.querySelector('.authorInput')
  fireEvent.change(input, {
    target: { value: 'test autttts' }
  })
  input = component.container.querySelector('.urlInput')
  fireEvent.change(input, {
    target: { value: 'test urllsss' }
  })
  const form = component.container.querySelector('.form')
  fireEvent.submit(form)

  const author = component.container.querySelector('.titleInput')
  expect(author.value).toBe('test titssss')
})