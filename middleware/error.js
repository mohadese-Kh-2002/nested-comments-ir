const errorHandler = (err, req, res, next) => {
  console.error("error:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "مشکلی پیش آمده است، لطفا دوباره تلاش کنید.";

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
export default errorHandler