import React from 'react'

const Person = (props) => {
  const person = props.per
  return (
    <li key={person.name}> {person.name} {person.number}</li>
  )
}

export default Person