import React, { useEffect, useState } from 'react'

const Books = (props) => {

  const [filteredBooks, setFilteredBooks ] = useState(props.books)
  useEffect(() => {
    setFilteredBooks(props.books)
  }, [props])
  
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

  console.log("books", props.books)
  console.log("filteredbooks", filteredBooks)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <ul>
        {genres.map(genre => 
          <button key={genre} onClick={() => 
            setFilteredBooks( books.filter(book => book.genres.includes(genre)))}>{genre}</button>
        )}
      </ul>
    </div>
  )
}

export default Books