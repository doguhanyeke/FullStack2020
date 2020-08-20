import React from 'react'

const PersonForm = (props) => {
  const addPerson = props.onSubmit
  const handleNameChange = props.onChange1
  const handleNumberChange = props.onChange2
  const newName = props.value1
  const newNumber = props.value2
  return (
      <form onSubmit={addPerson} >
      <div>
        name: <input onChange={handleNameChange} value={newName}/>
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={newNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm