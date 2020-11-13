const { gql } = require("apollo-server")

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    dateOfBirth: String
    about: String
    address: Address
  }
  type Address {
    addressLine1: String!
    addressLine2: String
    city: String!
    state: String!
    zipCode: String!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  input inputAddress {
    addressLine1: String!
    addressLine2: String
    city: String!
    state: String!
    zipCode: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post!
    getUser(userId: ID!): User!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    updateProfile(dateOfBirth: String, about: String, profilePicture: String, address: inputAddress): User!
  }
  type Subscription {
    newPost: Post!
  }
`
