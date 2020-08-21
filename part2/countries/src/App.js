import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ searchWord, setSearchWord ] = useState('')

  console.log("hola", process.env.REACT_APP_API_KEY)

  useEffect(() => {
      axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(
        response => {
          setCountries(response.data)
        })
    },[])

  const filterCountries = (event) => {
    setSearchWord(event.target.value)
  }

  const filteredCountries = countries.filter( country =>
    country.name.toLowerCase().includes(searchWord) 
  )  

  return (
    <div>
      <Filter onChange={filterCountries}/>
      <Countries filteredCountries={filteredCountries}/>
    </div>
  )
}

export default App