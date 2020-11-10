const { AuthenticationError, UserInputError } = require("apollo-server")
const Post = require("../../models/Post")
const checkAuth = require("../../utils/checkAuth")

module.exports = resolvers = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 })
        return posts
      } catch (error) {
        throw new Error(error)
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId)
        if (post) {
          return post
        } else {
          throw new Error("Post not found")
        }
      } catch (err) {
        throw new Error(err)
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context)
      if (!body.trim()) {
        throw new UserInputError("Body can't be empty")
      }
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      })
      try {
        const post = await newPost.save()
        context.pubsub.publish("NEW_POST", {
          newPost: post,
        })
        return post
      } catch (error) {
        throw new Error(error)
      }
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context)
      try {
        const post = await Post.findById(postId)
        if (post) {
          if (post.username === user.username) {
            await post.deleteOne()
            return "Post deleted"
          } else {
            throw new AuthenticationError("Not authorized")
          }
        } else {
          throw new UserInputError("Post not found")
        }
      } catch (error) {
        throw new Error(error)
      }
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
    },
  },
}
