import React from 'react'

const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercise}
      </p>
    )
  }
  
  const Total = ({parts}) => {
    return (
      <h3>total of {parts.reduce((acc, part, index) => {
        return acc + part.exercises
      }, 0)} exercises</h3>
    )
  }
  
  const Course = ({course}) => {
    const header = course.name
    const parts = course.parts
    return (
      <div>
        <Header course={header}/>
        <ul>
          {parts.map(part =>
            <Part part={part.name} exercise={part.exercises} key={part.id}/>
          )}
        <Total parts={parts}/>
        </ul>
      </div>
    )
  }

  export default Course