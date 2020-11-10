const postsResolvers = require("./posts")
const usersResolvers = require("./users")
const commentResolvers = require("./comments")
const likeResolvers = require("./likes")

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentResolvers.Mutation,
    ...likeResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
  },
}
