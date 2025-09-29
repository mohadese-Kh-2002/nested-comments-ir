import User from "../models/user.js";
import jwt from "jsonwebtoken";
const generateJwt = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_JWT, {
    expiresIn: "7d",
  });
};
const register = async (req, res, next) => {
  try {
    const { userName, phoneNumber, role = "user" } = req.body;
    let user = await User.findOne({ phoneNumber });
    if (user) return res.status(400).json({ message: "کاربر قبلاً ثبت شده." });
    user = await User.create({ userName, phoneNumber, role });
    const token = generateJwt(user);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      message: "ثبت‌نام موفق.",
      user: {
        _id: user._id,
        userName: user.userName,
        phoneNumber: user.phoneNumber,
        role: user.role,
      }
    });
  } catch (err) {
    next(err);
  }
};
 const requestOtp = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
    const user = await User.findOne({ phoneNumber });
    if (!user) return res.status(404).json({ message: "کاربری یافت نشد." });
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.otp = otp;
    user.otpExpire = Date.now() + 2 * 60 * 1000; 
    await user.save();
    console.log(` OTP for ${phoneNumber}: ${otp}`);
    res.status(200).json({ message: "کد OTP ارسال شد.",otpCode:otp });
  } catch (err) {
    next(err);
  }
};
const verifyOtp = async (req, res, next) => {
  try {
    const { phoneNumber, otp } = req.body;
    const user = await User.findOne({ phoneNumber });
    if (!user) return res.status(404).json({ message: "کاربری یافت نشد." });

    if (user.otp !== otp || user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "کد OTP نامعتبر یا منقضی است." });
    }
    const token = generateJwt(user);

  
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    res.status(200).json({ message: "ورود موفق." });
  } catch (err) {
    next(err);
  }
};
export {register,requestOtp,verifyOtp}