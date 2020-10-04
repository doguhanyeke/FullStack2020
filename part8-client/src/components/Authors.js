  
import { useMutation } from '@apollo/client'
import React from 'react'
import { EDIT_BIRTHYEAR } from '../Queries'

const Authors = (props) => {
  const [editBirthYear] = useMutation(EDIT_BIRTHYEAR)
  if (!props.show) {
    return null
  }
  let authors = []
  if(props.authors)
    authors = props.authors
  console.log("authors: ", authors)

  const submit = (event) => {
    event.preventDefault()
    console.log(event.target.name.value, event.target.born.value)
    editBirthYear({
      name: event.target.name.value,
      setBornTo: event.target.born.value
    })
    
    event.target.name.value = ''
    event.target.born.value = ''


  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input name='name'/>
        </div>
        <div>
          born
          <input name='born'/>
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
