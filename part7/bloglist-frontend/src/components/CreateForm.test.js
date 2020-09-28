import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM} from '@testing-library/dom'
import CreateForm from './CreateForm'

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