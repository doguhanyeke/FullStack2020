import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query { 
    allBooks {
      title
      published
      genres
      author{
        name
        born
      }
    }
  }
`

export const ALL_BOOKS_BY_GENRE = gql`
  query allBooksByGenre($genre: String) {
    allBooks(genre: $genre){
      title
      published
      genres
      author {
        name
        born
      }
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors{
      name
      born
      id
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      published
      genres
      author{
        name
        born
      }
    }
  }
`

export const EDIT_BIRTHYEAR = gql`
  mutation editBirthyearByYear($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
      id
    }
  }
`

export const LOGIN = gql`
  mutation loginUser($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password
    ) {
      value
    }
  }
`

export const FIND_USER = gql`
  query findUserByName($username: String!) {
      findUser(username: $username) {
        username
        favoriteGenre
      }
  }
`