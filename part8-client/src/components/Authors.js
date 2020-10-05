import { useMutation, gql } from '@apollo/client'
import React from 'react'
import { ALL_AUTHORS } from '../Queries'

const EDIT_BIRTHYEAR = gql`
  mutation EditBirthyearByYear($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
      id
    }
  }
`

const Authors = (props) => {
  const [editBirthYear, { data }] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  if (!props.show) {
    return null
  }
  
  let authors = []
  if(props.authors){
    authors = props.authors
  }

  const submit = (event) => {
    event.preventDefault()
    
    editBirthYear( {
      variables: {
        name: event.target.name.value,
        setBornTo: Number(event.target.born.value)
      }
    })
    console.log("data:", data)

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
