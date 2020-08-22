import React from 'react'

const Person = (props) => {
  const person = props.per
  const deletePerson = props.deletePerson
  return (
    <li key={person.name}>
      {person.name} {person.number}
      <button onClick={deletePerson} > delete </button>
    </li>
  )
}

export default Person