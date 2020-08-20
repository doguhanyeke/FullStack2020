import React from 'react'
import Person from './Person'

const Persons = (props) => {
    const filteredPersons = props.filteredPersons
    return (
      <ul>
        {filteredPersons.map(person => <Person per={person} key={person.name}/>)}
      </ul>
    )
}

export default Persons