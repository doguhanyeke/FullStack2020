import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import {FIND_USER} from '../Queries'

const Recommend = (props) => {
  const wholebooks = props.books

  const [favGenre, setFavGenre] = useState("")
  console.log("ooo")
  const [findUser, result] = useLazyQuery(FIND_USER, {
    variables: {
      username: props.username
    },
    onCompleted() {
      console.log("res", result)
      setFavGenre(result.data.findUser.favoriteGenre)
    },
    onError: (error) => {
      console.log("here", error)
    }
  })

  useEffect(() => {
    findUser({
      variables: {
        username: props.username
      }
    })
  }, [props.username, findUser])

  if(!props.show){
    return null
  }
  return(
    <div>
      <div>
        <p>
          books in your favorite genre: <strong>{favGenre}</strong>
        </p>
      </div>
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
          {wholebooks.filter(book => book.genres.includes(favGenre)).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend