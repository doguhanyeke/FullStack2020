import React from 'react'
import OneCountry from './OneCountry'
import { useState } from 'react'

const Country = (props) => {
  const [ view, setView ] = useState(false)

  const country = props.country
  const handleShowClick = () => {
    setView(true)
  }

  return (
    <li key={country.name}> {country.name} 
      <button onClick={handleShowClick} > show </button>
      {view ? <OneCountry country={country} /> : <p></p> }
    </li>
  )
}

export default Country