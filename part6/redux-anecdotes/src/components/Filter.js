import React from 'react'
import { connect } from 'react-redux'
import { filterAction } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    props.filterAction(event.target.value)
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

const mapDispatchToProps = {
  filterAction
}

const connectedFilter = connect(
  null,
  mapDispatchToProps
)(Filter)
export default connectedFilter