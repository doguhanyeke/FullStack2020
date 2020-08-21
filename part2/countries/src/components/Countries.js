import React from 'react'
import Country from './Country'
import OneCountry from './OneCountry'
import { useState } from 'react'

const Countries = (props) => {
    const filteredCountries = props.filteredCountries

    const [ specCountry, setSpecCountry ] = useState( {} )

    const handleShowClick = () => {
      console.log("cuzz")
      setSpecCountry( filteredCountries[0] )
      console.log(filteredCountries[0].name)
    }

    if (filteredCountries.length > 10) {
      return (
        <p>Too many matches, specify another filter</p>
      )
    } else if(filteredCountries.length > 1) {
      return (
        <ul>
            {filteredCountries.map(country => 
            <Country country={country}/>
            )}    
        </ul>
      )
    } else if(filteredCountries.length === 1) {
      return(
          <OneCountry country={filteredCountries[0]} />
      )
    } 
    else{
      return(
        <ul>
        </ul>
      )
    }
}

export default Countries