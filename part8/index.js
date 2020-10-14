const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

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
        genres: [String!]!
      ): Book
      editAuthor(
        name: String!
        setBornTo: Int!
      ): Author
      createUser(
        username: String!
        favoriteGenre: String!
      ): User
      login(
        username: String!
        password: String!
      ): Token
    }
    type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book]!
      allAuthors: [Author]!
      me: User
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
    type User {
      username: String!
      favoriteGenre: String!
      id: ID!
    }
    type Token{
      value: String!
    }
    `

  const resolvers = {
    Mutation: {
      addBook: async (root, args, context) => {

        if(!context.currentUser){
          throw new AuthenticationError("unauthenticated")
        }

        const author = await Author.findOne({name: args.author})

        console.log("addBook", context.currentUser, author)
        const book = new Book({ ...args,  author: author._id})
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
      editAuthor: (root, args, context) => {
        if(!context.currentUser){
          throw new AuthenticationError("unauthenticated")
        }
        console.log("edit", context.currentUser)
        Author.findOne({name: args.name}).then(res => {
          res.born = args.setBornTo
          res.save().then(result => {return result})
        })        
      },
      createUser: (root, args) => {
        console.log("create user")
        const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre
        })
        return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
      },
      login: async (root, args) => {
        console.log("login")
        const user = await User.findOne({username: args.username})
        if (!user || args.password !== 'secred') {
          throw new UserInputError("wrong credentials")
        }
        const userToken = {
          username: user.username,
          id: user._id
        }
        console.log("login")
        return {value: jwt.sign(userToken, JWT_SECRET)}
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
      me: (root, args, context) => {
        return context.currentUser
      }
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
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      console.log("authenticated")
      const decodedToken = jwt.decode(auth.substring(7),
       JWT_SECRET)
       const currentUser = await User.findById(decodedToken.id)
       return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})