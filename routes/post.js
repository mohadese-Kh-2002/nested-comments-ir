import express from "express";
import { createPost, getPosts } from "../controllers/post.js";

const postRouter = express.Router();

postRouter.post("/", createPost);
postRouter.get("/", getPosts);

export default postRouter;
