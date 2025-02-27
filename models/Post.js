const { Schema, model } = require("mongoose")

const postSchema = new Schema({
  body: String,
  username: String,

  createdAt: String,
  comments: [{ body: String, createdAt: String, username: String }],
  likes: [{ createdAt: String, username: String }],
  user: { type: Schema.Types.String, ref: "User" },
})

module.exports = model("Post", postSchema)
