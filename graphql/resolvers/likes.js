const { UserInputError } = require("apollo-server")
const checkAuth = require("../../utils/checkAuth")
const Post = require("../../models/Post")

module.exports = {
  Mutation: {
    async likePost(_, { postId }, context) {
      if (postId) {
        const user = checkAuth(context)
        try {
          const post = await Post.findById(postId)
          if (post) {
            const likes = post.likes
            if (likes.find((like) => like.username === user.username)) {
              post.likes = post.likes.filter((like) => like.username !== user.username)
            } else {
              post.likes.unshift({ username: user.username, createdAt: new Date().toISOString() })
            }
            const updatedPost = await post.save()

            return updatedPost
          } else {
            throw new UserInputError("Post with does not exist")
          }
        } catch (error) {
          throw new Error(error)
        }
      } else {
        throw new UserInputError("postId is required")
      }
    },
  },
}
