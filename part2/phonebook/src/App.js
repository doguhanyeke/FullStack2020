import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/person'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchWord, setSearchWord ] = useState('')

  useEffect(() => {
      personService
      .getAll()
      .then(response => {
        setPersons(
          response.data.filter(
            persond => 'name' in persond
          ))
      })
    },[])

  const handleNumberChange = (event) => {
    /*console.log("number changed", event.target.value)*/
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    /*console.log('name changed', event.target.value)*/
    setNewName(event.target.value)
  }
  
  const addPerson = (event) => {
    event.preventDefault()
    let notExist = persons.reduce((result, person) => {
      if (person.name === newName) {
        result = false
      }
      return result
    }, true)
    if (!notExist) {
      if (window.confirm(`${newName} is already added to phonebook,
      replace the old number with a new one?`)) {
        const id = persons.find(p => p.name === newName).id
        personService
        .update(id, {name: newName, number: newNumber})
        .then(response => 
          setPersons( persons.map(p => 
            p.id === response.data.id ? response.data : p
            ) ))

      }


    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
      .create(personObject)
      .then(response => {
        setPersons( persons.concat(response.data) )
      })
    }
    setNewNumber('')
    setNewName('')
  }

  const deletePerson = (id) => {
    const name = persons.find(p => p.id === id).name
    if (window.confirm(`Delete ${name}`)) { 
      console.log("clicccck")
      personService
      .deleteP(id)
      .then(response => {
        console.log(response.data)
        setPersons( persons.filter(person =>
          person.id !== response.data.id))
      })
    }
  }

  const filterPersons = (event) => {
    setSearchWord(event.target.value)
  }

  const filteredPersons = persons.filter( person => 
    person.name.toLowerCase().includes(searchWord) 
  )    

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={filterPersons}/>
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} 
        onChange1={handleNameChange}
        value1={newName}
        onChange2={handleNumberChange}
        value2={newNumber}
      />
      <h3>Numbers</h3>
      <Persons 
      filteredPersons={filteredPersons} 
      deletePerson={deletePerson} />
    </div>
  )
}

export default App