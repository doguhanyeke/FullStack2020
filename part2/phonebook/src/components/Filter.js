import React from 'react'

const Filter = (props) => {
    return (
        <div>
        filter shown with <input onChange={props.onChange}></input>
        </div>
    )
}

export default Filter