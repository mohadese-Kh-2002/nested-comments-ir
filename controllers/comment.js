import Comment from "../models/comment.js";

const createComment = async (req, res, next) => {
  try {
    const { postId, parentId = null, content,user } = req.body;
    if (!content || !postId) {
      return res.status(400).json({ message: "پست و محتوا الزامی هست ." });
    }
    const newComment = await Comment.create({
      content,
      parentId,
      postId,
      user:user || req.user.id,
    });

    res.status(201).json({ message: "کامنت ثبت شد ✅", comment: newComment });
  } catch (err) {
    next(err);
  }
};
const getComments = async (req, res, next) => {
  try {
    const { postId } = req.body;
    const { page = 1, limit = 3 } = req.query;
    const comments = await Comment.find({ postId })
      .lean()
      .populate("postId", "title content")
      .populate("parentId", "content")
      .populate('user','userName')
    const commentsMap = {};
    comments.forEach((c) => {
      commentsMap[c._id.toString()] = { ...c, children: [] };
    });

    const roots = [];
    comments.forEach((c) => {
      if (c.parentId) {
        commentsMap[c.parentId._id.toString()].children.push(
          commentsMap[c._id.toString()]
        );
      } else {
        roots.push(commentsMap[c._id.toString()]);
      }
    });
    const paginatedRoots = roots.slice((page - 1) * limit, limit * page);
    
    res.status(200).json({ comments: paginatedRoots });
  } catch (err) {
 
    next(err);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { postId, parentId, content, user } = req.body;
    const comment = await Comment.findById(commentId);
    if (!comment)
      return res.status(404).json({ message: "کامنتی وجود ندارد." });
    if (
      comment.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "اجازه ویرایش ندارید." });
    }
    comment.postId = postId || comment.postId;
    comment.parentId = parentId || comment.parentId;
    comment.content = content || comment.content;
    comment.user = user || comment.user;

    await comment.save();
    res.status(200).json({ message: "کامنت با موفقیت بروزرسانی شد.", comment });
  } catch (err) {
    next(err);
  }
};
const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment)
      return res.status(404).json({ message: "کامنتی وجود ندارد." });
    if (comment.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "اجازه دسترسی ندارید." });
    }
    await comment.deleteOne();

    res.status(200).json({ message: "کامنت با موفقیت حذف شد." });
  } catch (err) {
    next(err);
  }
};

export { createComment, getComments, updateComment, deleteComment };
