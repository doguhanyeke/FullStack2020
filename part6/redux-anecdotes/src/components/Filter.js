import React from 'react'
import { useDispatch } from 'react-redux'
import { filterAction } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(filterAction(event.target.value))  
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange}></input>
    </div>
  )
}

export default Filter