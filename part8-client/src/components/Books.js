import { useLazyQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import {ALL_BOOKS_BY_GENRE} from '../Queries'

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState(null)

  const [filterBooks, result] = useLazyQuery(ALL_BOOKS_BY_GENRE, {
    onError: (error) => {
      console.log("error in books", error)
    }
  })

  useEffect(() => {
    filterBooks({
      variables: {
        genre: genreFilter
      }
    })
  }, [filterBooks])
  
  if (!props.show) {
    return null
  }

  let books = []
  let genres = new Set()
  if(props.books){
    books = props.books

    books.map((book) => 
      book.genres.map(genre => genres.add(genre))
    )
    genres = Array.from(genres)
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>
              title
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.filter(b => genreFilter ? b.genres.includes(genreFilter) : true).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <ul>
      Genres:
        {genres.map(genre => 
          <button key={genre} onClick={() => 
            setGenreFilter(genre)}>{genre}</button>
        )}
      </ul>
      <div>
        <button onClick={() => {setGenreFilter(null)}}>reset genre type</button>
      </div>
    </div>
  )
}

export default Books