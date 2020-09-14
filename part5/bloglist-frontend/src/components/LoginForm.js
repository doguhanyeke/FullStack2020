import React, { useState } from 'react' 
import PropTypes from 'prop-types'
    
const LoginForm = ({createLogin, setLoginMessage, setUserId}) => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const response = await createLogin({
        username: username, 
        password: password
      })
      window.localStorage.setItem("userToken", `bearer ${response.token.toString()}`)
      setName(response.name)
      setLoginMessage('Login successful')
      setUserId(response.id)
      setTimeout(() => {
        setLoginMessage('')
      }, 5000)

      setUserName('')
      setPassword('')
    } catch{
      console.error("error in getting token")
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('userToken')
    setUserId('')
    setUserName('')
    setPassword('')
    setLoginMessage(`Logged out`)
    setTimeout(() => {
      setLoginMessage('')
    }, 5000)
  }

  const showWhenUserLoggedIn = {display: window.localStorage.getItem('userToken') ? '' : 'none'}
  const hideWhenUserLoggedIn = {display: window.localStorage.getItem('userToken') ? 'none' : ''}
  
  return(
    <div>
      <h2>Log in to application</h2>
      <div style={showWhenUserLoggedIn} >
        {name} logged in
        <button onClick={handleLogOut} >log out</button>
      </div>

      <form style={hideWhenUserLoggedIn} onSubmit={handleLogin}>
        <div>
            username
            <input 
            id='username'
            type='text' 
            value={username} 
            onChange={({target}) => {setUserName(target.value)}} ></input>
        </div>
        <div>
            password
            <input 
            id='password'
            type='password'
            value={password} 
            onChange={({target}) => setPassword(target.value)} >
            </input>
        </div>
        <button id='login-button'> login </button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  createLogin: PropTypes.func.isRequired,
  setLoginMessage: PropTypes.func.isRequired,
  setUserId: PropTypes.func.isRequired
}

export default LoginForm