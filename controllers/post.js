import Post from "../models/post.js";

const createPost=async(req,res,next)=>{
    try{
        const {title,content}=req.body
         if (!title || !content) {
            return res.status(400).json({ message: "عنوان و محتوا الزامی هستند." });
        }
        const newPost=new Post({
            title,
            content
        })
        await newPost.save()
        res.status(201).json({message:'پست بدرستی ایجاد شد.',post:newPost})

    }catch(err){
        next(err)
    }
}
const getPosts=async(req,res,next)=>{
    try{
        const posts=await Post.find({}).sort({ createdAt: -1 }).limit(50)
       const message=posts.length===0?'پستی وجود ندارد.':'نمایش پست ها'
        res.status(200).json({posts,message})
    }catch(err){
        next(err)
    }
}
export {createPost,getPosts}