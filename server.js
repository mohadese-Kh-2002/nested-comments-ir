import e from "express";
import connectDB from "./config/db.js";
import { configDotenv } from "dotenv";

import commentRouter from "./routes/comment.js";
import postRouter from "./routes/post.js";
import errorHandler from "./middleware/error.js";
import authRouter from "./routes/auth.js";
import cookieParser from "cookie-parser";
configDotenv()
const app=e()
app.use(e.json())
app.use(cookieParser());
connectDB()
app.use('/api/posts',postRouter)
app.use('/api/comments',commentRouter)
app.use('/api/auth',authRouter)
app.use(errorHandler)
const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
   console.log(`✅ Server running on port ${PORT}`);
})