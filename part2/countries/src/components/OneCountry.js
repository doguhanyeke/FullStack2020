import React from 'react'
import "./OneCountry.css"

const OneCountry = (props) => {
  const countryName = props.country.name
  const capital = props.country.capital
  const population = props.country.population
  const languages = props.country.languages
  const flag = props.country.flag

  if (Object.keys(props.country).length === 0) {
    return (
        <div>
        </div>
    )
  }
  return (
    <div>
        <h1> {countryName} </h1>
        <p> capital {capital} </p>
        <p> population {population} </p>
        <h2> languages </h2>
        <ul> 
            {languages.map((lang, index) => <li key={index}> {lang.name} </li>)} 
        </ul>
        <img className="photo" src={flag}/>
    </div>
  )
}

export default OneCountry