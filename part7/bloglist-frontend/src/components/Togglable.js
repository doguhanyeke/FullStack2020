import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  return (
    <div>
      <div style={hideWhenVisible}>
        <Button id='toggleButton' onClick={() => setVisible(true)}>{props.buttonLabel}</Button>
      </div>
      <div className='togglableContent' style={showWhenVisible}>
        {props.children}
        <Button onClick={() => setVisible(false)}>cancel</Button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable

