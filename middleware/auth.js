import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ message: "توکن یافت نشد " });
  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Auth Error:", err.message);
    res.status(401).json({ message: "توکن نامعتبر یا منقضی شده است." });
  }
};
export default authMiddleware