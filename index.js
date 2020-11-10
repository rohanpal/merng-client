const { ApolloServer, PubSub } = require("apollo-server")
const mongoose = require("mongoose")
const { MONGODBURL } = require("./config")

const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers")

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => ({ req, pubsub: new PubSub() }) })
const port = process.env.PORT || 5000

mongoose
  .connect(MONGODBURL, { useNewUrlParser: true })
  .then((res) => {
    console.log("connected db")
    return server.listen({ port }).then((res) => console.log(`server running at ${res.url}`))
  })
  .catch((e) => console.log(e))
