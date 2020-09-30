import React, { useState } from 'react' 
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setUserID } from '../reducers/userReducer'
import { Form, FormControl, FormGroup, FormLabel, Button } from 'react-bootstrap'

const LoginForm = ({createLogin, setLoginMessage}) => {
  const dispatch = useDispatch()
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await createLogin({
        username: username, 
        password: password
      })
      window.localStorage.setItem("userToken", `bearer ${response.token.toString()}`)
      setName(response.name)
      dispatch(setLoginMessage('Login successful'))
      dispatch(setUserID(response.id))
      setTimeout(() => {
        dispatch(setLoginMessage(''))
      }, 5000)

      setUserName('')
      setPassword('')
    } 
    catch {
      console.error("error in getting token")
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('userToken')
    dispatch(setUserID(''))
    setUserName('')
    setPassword('')
    dispatch(setLoginMessage(`Logged out`))
    setTimeout(() => {
      dispatch(setLoginMessage(''))
    }, 5000)
  }

  const showWhenUserLoggedIn = {display: window.localStorage.getItem('userToken') ? '' : 'none'}
  const hideWhenUserLoggedIn = {display: window.localStorage.getItem('userToken') ? 'none' : ''}
  
  return(
    <div>
      <div style={showWhenUserLoggedIn} >
        <em>{name} logged in</em>
        <Button type='submit' onClick={handleLogOut} >log out</Button>
      </div>
      
      <Form style={hideWhenUserLoggedIn} onSubmit={handleLogin}>
      <h3>Log in to application</h3>
        <FormGroup>
          <FormLabel>username</FormLabel>
          <FormControl 
            id='username'
            type='text' 
            value={username} 
            onChange={({target}) => {setUserName(target.value)}} 
          />
          <FormLabel>password</FormLabel>
          <FormControl
            id='password'
            type='password'
            value={password} 
            onChange={({target}) => setPassword(target.value)}
          />
          <Button variant='primary' type='submit' id='login-button'>
             login 
          </Button>
        </FormGroup>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  createLogin: PropTypes.func.isRequired
}

export default LoginForm