import React from 'react'
import Person from './Person'

const Persons = (props) => {
    const filteredPersons = props.filteredPersons
    const deletePerson = props.deletePerson
    return (
      <ul>
        {filteredPersons.map(person => 
        <Person per={person} 
        key={person.name}
        deletePerson={() => deletePerson(person.id)}
        />)}
      </ul>
    )
}

export default Persons