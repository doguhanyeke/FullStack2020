const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const { v1: uuid } = require('uuid')

const MONGODB_URI = 'mongodb+srv://fullstack_dogu:123@cluster0.kcozd.mongodb.net/part8?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

  const typeDefs = gql`
    type Mutation {
      addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String]!
      ): Book
      editAuthor(
        name: String!
        setBornTo: Int!
      ): Author
    }
    type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book]!
      allAuthors: [Author]!
    }
    type Book {
      title: String!
      published: Int!
      author: Author!
      id: ID!
      genres: [String!]!
    }
    type Author {
      name: String!
      id: ID!
      born: Int
      bookCount: Int!
    }
    `

  const resolvers = {
    Mutation: {
      addBook: (root, args) => {
        const author = Author.findOne({name: "Robert Martin"})
        console.log("author: ", author)
        const book = new Book({ ...args,  author: author.id})
        console.log("book: ", book)
        return book.save()
        /*
        console.log("add book")
        isAuthorExist = authors.reduce((isExist, author) => {
          isExist = args.author === author.name ? true : (isExist || false)
          return isExist
        }, false)
        if(!isAuthorExist){
          const author = {
            name: args.author,
            id: uuid()
          }
          authors = authors.concat(author)
        }

        books = books.concat(book)
        return book
        */
      },
      editAuthor: (root, args) => {
        console.log("edit", args)
        const returnedAuthor = authors.find(author => author.name === args.name)
        if(returnedAuthor){
          returnedAuthor.born = args.setBornTo
          authors = authors.map(author => author.name === args.name ? returnedAuthor : author)
        }
        return returnedAuthor
      }
    },
    Query: {
      bookCount: () => {
        console.log("asd")
        return Book.collection.countDocuments()
      },
      authorCount: () => {
        return Author.collection.countDocuments()
      },
      allBooks: (root, args) => { 
        const books = Book.find({}).populate('author')
        console.log("allBooks")
        return books
        /*  
        console.log("All books entered")   
        if(args.length !== 0){
          if(args.author && args.genre){
            return (books.filter(book => book.author === args.author && book.genres.includes(args.genre)))
          }
          else if(args.author){
            return books.filter(book => book.author === args.author)
          } else if(args.genre){
            return books.filter(book => book.genres.includes(args.genre))
          }
        }
        return books
        */
      },
      allAuthors: (root, args) => {
        const authors = Author.find({})
        console.log("allAuthors")
        return authors
      },
    },
    Author: {
      bookCount: (root, args) => {
        return books.reduce((count, book) => {
          count += book.name === root.name ? 1 : 0
          return count
        }, 0)
      }
    }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})