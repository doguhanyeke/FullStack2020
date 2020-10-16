import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import {LOGIN} from '../Queries'

const Login = ({show, user, setUser, setToken}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log("error in login", error.graphQLErrors[0].message)
    }
  })
  useEffect(() => {
    if(result.data){
      const token = result.data.login.value
      setToken(token)
      window.localStorage.setItem("userToken", token)
    }
  }, [result.data, setToken])

  if(!show){
    return null
  }
  if(user){
    return(
      <div>
        Username: {user} logged in
      </div>
    )
  }

  const submit = async (event) => {
    event.preventDefault()
    await login({
        variables: {
          username,
          password
        }
    })
    setUser(username)
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