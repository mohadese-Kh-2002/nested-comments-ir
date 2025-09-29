import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    postId: { type: mongoose.Schema.ObjectId, ref: "Post", required: true },
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    content: { type: String, required: true },
    parentId: { type: mongoose.Schema.ObjectId, ref: "Comment", default: null }
  },
  {
    timestamps: true,
  }
);
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
