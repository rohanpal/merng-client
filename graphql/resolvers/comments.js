const { UserInputError, AuthenticationError } = require("apollo-server")
const checkAuth = require("../../utils/checkAuth")
const { validateCommentInput } = require("../../utils/validators")
const Post = require("../../models/Post")

module.exports = {
  Mutation: {
    createComment: async (_, { body, postId }, context) => {
      const { errors, valid } = validateCommentInput(body)
      if (valid) {
        try {
          const { username } = checkAuth(context)
          const post = await Post.findById(postId)
          if (post) {
            post.comments.unshift({ body, username, createdAt: new Date().toISOString() })
            post.save()
            return post
          } else {
            throw new UserInputError("Post not found")
          }
        } catch (error) {
          throw new Error(error)
        }
      } else {
        throw new UserInputError(errors)
      }
    },
    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = checkAuth(context)
      try {
        const post = await Post.findById(postId)

        if (post) {
          const commentIndex = post.comments.findIndex((comment) => comment.id === commentId)
          if (commentIndex > -1) {
            if (post.comments[commentIndex].username === username) {
              post.comments.splice(commentIndex, 1)
              await post.save()
              return post
            } else {
              throw new AuthenticationError("Not Allowed")
            }
          } else {
            throw new UserInputError("Comment not found")
          }
        } else {
          throw new UserInputError("Post not found")
        }
      } catch (error) {
        throw new Error(error)
      }
    },
  },
}
