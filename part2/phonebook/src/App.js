import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchWord, setSearchWord ] = useState('')

  useEffect(() => {
      axios
      .get("http://localhost:3001/persons")
      .then(
        response => {
          setPersons(response.data)
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
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
    }
    setNewNumber('')
    setNewName('')
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
      <Persons filteredPersons={filteredPersons}/>
    </div>
  )
}

export default App