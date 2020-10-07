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
  mutation createBook($title: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
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