import express from "express";
import { createComment, deleteComment, getComments, updateComment } from "../controllers/comment.js";
import authMiddleware from "../middleware/auth.js";

const commentRouter = express.Router();

commentRouter.post("/",authMiddleware, createComment);
commentRouter.get("/", getComments);
commentRouter.patch('/:commentId',authMiddleware,updateComment)
commentRouter.delete('/:commentId',authMiddleware,deleteComment)

export default commentRouter;
