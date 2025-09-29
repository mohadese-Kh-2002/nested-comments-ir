import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      minlength: [3, "نام کاربری باید حداقل ۳ کاراکتر باشد."],
      maxlength: [20, "نام کاربری نمی‌تواند بیشتر از ۲۰ کاراکتر باشد."],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "شماره تلفن الزامی است."],
      match: [/^\d{11}$/, "شماره تلفن باید دقیقا ۱۱ رقم باشد."],
      unique: true,
      trim: true,
    },
    otp: { type: String },
    otpExpire: { type: Date },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
