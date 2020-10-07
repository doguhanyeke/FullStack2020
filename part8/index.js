const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

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
        published: Int!
        genres: [String!]!
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
      addBook: async (root, args) => {
        const res = await Author.findOne({name: "Robert Martin"})
        const book = new Book({ ...args,  author: res._id})
        try {
          await book.save()
        } catch(error) {
          console.log("hıyarrrr")
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
        return book
      },
      editAuthor: (root, args) => {
        console.log("edit", args)
        Author.findOne({name: args.name}).then(res => {
          res.born = args.setBornTo
          res.save().then(result => {return result})
        })        
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
        Book.find({}).populate('author').then(res => console.log("resBooks", res))
        let books = Book.find({}).populate('author')
        console.log("allBooks")
        if(args.genre){
          books = Book.find({genres: args.genre})
        }
        return books
      },
      allAuthors: (root, args) => {
        const authors = Author.find({})
        console.log("allAuthors")
        return authors
      },
    },
    Author: {
      bookCount: async (root, args) => {
        console.log("args", root.id)
        const books = await Book.find({ author: root.id })  
        return books.length
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