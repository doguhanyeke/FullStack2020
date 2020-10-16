import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider
} from '@apollo/client'
import { setContext } from 'apollo-link-context';

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
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat( new HttpLink(
    { uri: 'http://localhost:4000/graphql/'}
  ))
})



ReactDOM.render(
  <ApolloProvider client={client}>
    <App />    
  </ApolloProvider> 
  ,document.getElementById('root'))