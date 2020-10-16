import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
  split
} from '@apollo/client'
import { setContext } from 'apollo-link-context';
import {getMainDefinition} from '@apollo/client/utilities'

import {WebSocketLink} from '@apollo/client/link/ws'

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = window.localStorage.getItem('userToken');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : "",
    }
  }
})

const httpLink = new HttpLink({
  uri: 'http://localhost:4000'
})

const wsLink = new WebSocketLink({
  uri: 'http://localhost:4000/graphql',
  options: {
    reconnect: true
  }
})

const splitLink = split(
  ({query}) => {
    const definiton = getMainDefinition(query)
    return (
      definiton.kind === 'OperationDefinition' &&
      definiton.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat( httpLink )
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />    
  </ApolloProvider> 
  ,document.getElementById('root'))