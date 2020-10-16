import React, {useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './Queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState(null)
  
  const [authors, setAuthors] = useState([])
  const authorResult = useQuery(ALL_AUTHORS)

  const [books, setBooks] = useState([])

  const [ token, setToken ] = useState(null)

  const booksResult = useQuery(ALL_BOOKS)
  
  useEffect(() => {
    if(authorResult.data){
      setAuthors(authorResult.data.allAuthors)
    }
  }, [authorResult.data])

  useEffect(() => {
    if(booksResult.data){
      setBooks(booksResult.data.allBooks)
    }
  }, [booksResult.data])

  useEffect(() => {
    if(window.localStorage.getItem("userToken")) {
      window.localStorage.removeItem("userToken")
    }
  }, [])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={() => setPage('login')}>{window.localStorage.getItem("userToken") ? "logout" : "login"}</button>
      </div>

      <Authors
        show={page === 'authors'}
        authors={authors}
      />

      <Books
        show={page === 'books'}
        books={books}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommend
        show={page === 'recommend'}
        books={books}
        username={user}
      />

      <Login 
        show={page === 'login'}
        user={user}
        setUser={setUser}
        setToken={setToken}
      />

    </div>
  )
}

export default App