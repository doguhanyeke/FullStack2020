import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/person'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchWord, setSearchWord ] = useState('')
  const [ errorMes, setErrorMes ] = useState( null )
  const [ errorType, setErrorType ] = useState( null )

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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        
        const id = persons.find(p => p.name === newName).id
        personService
        .update(id, {name: newName, number: newNumber})
        .then(response => {
          console.log('now', response)
          setErrorType( 'success' )
          setPersons( persons.map(p => 
            p.id === response.data.id ? response.data : p
            ))
        })
        .catch(error => {
          console.log("hiihi", error.response.data)
          setErrorType( 'error' )
          setErrorMes( error.response.data.error)
        })
      }


    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
      .create(personObject)
      .then(response => {
        console.log("he", response.data.error)
        
        setErrorMes(`Added ${newName}`)
        setErrorType('success')
        setPersons( persons.concat(response.data) )
        
        console.log("response data", response.data)        
      })
      .catch(error => {
        console.log("ülo", error.response.data)
        setErrorMes(error.response.data.error)
        setErrorType('error')
      })
    }
    setNewNumber('')
    setNewName('')
  }

  const deletePerson = (id) => {
    const name = persons.find(p => p.id === id).name
    if (window.confirm(`Delete ${name}`)) { 
      setErrorType( 'error' )
      personService
      .deleteP(id)
      .then(response => {
        setErrorMes( `Information of ${name} has already been removed from server` )
        setPersons( persons.filter(person =>
          person.id !== id))
      })
    }
  }

  const filterPersons = (event) => {
    setSearchWord(event.target.value)
  }

  const filteredPersons = persons.filter( person => {
    if (person.name) {
      return person.name.toLowerCase().includes(searchWord) 
    }
  }
  )    

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMes} className={errorType} />
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