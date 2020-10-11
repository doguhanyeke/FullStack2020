import { useLazyQuery, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import {LOGIN} from '../Queries'

const Login = ({show}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ login ] = useMutation(LOGIN)

  if(!show){
    return null
  }
  const submit = async (event) => {
    event.preventDefault()
    console.log("submit", username, password)
    try{
      const response = await login({
        variables: {
          username,
        password
        }
      })
      window.localStorage.setItem("userToken", "bearer " + response.data.login.value)
      console.log("res", response)
    } catch(error) {
      console.log("login error", error.message)
    }
    
  }
  return(
    <div>
      <form onSubmit={submit}>
        <div>
          Username: <input value={username} onChange={({target}) => setUsername(target.value)} />
        </div>
        <div>
          Password: <input value={password} onChange={({target}) => setPassword(target.value)} />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login