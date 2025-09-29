# nested-comments-ir
پروژه: سیستم نظرات تو در تو

# ویژگی ها
1.نظرات تو در تو با ساختار درختی
**
2.احراز هویت OTP و JWT و ذخیره توکن در کوکی
**
3.صفحه بندی نظرات اصلی
**
4.ایجاد، ویرایش ، حذف نظرات با بررسی ثبت نام قبلی و نقش (user,admin)

# کتابخانه و ابزار های استفاده شده 
1.express فریم‌ورک اصلی
**
2.dotenv مدیریت متغیرهای محیطی
**
3.mongoose پایگاه داده
**
4.jsonwebtoken احراز هویت
**
5.cookie-parser مدیریت کوکی


# مدل های داده

{
  userName: { 
    type: String, 
    required: true, 
    minLength: 3, 
    maxLength: 20 
  },
  phoneNumber: { 
    type: String, 
    required: true, 
    match: /^\d{11}$/ 
  },
  otp: String,
  otpExpire: Date,
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  }
}


Post
{
  title: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  }
}

Comment
{
  postId: { 
    type: ObjectId, 
    ref: "Post", 
    required: true 
  },
  user: { 
    type: ObjectId, 
    ref: "User" 
  },
  content: { 
    type: String, 
    required: true 
  },
  parentId: { 
    type: ObjectId, 
    ref: "Comment", 
    default: null 
  }
}

# api route 
احراز هویت
api/auth/

/register 
متد post 
ثبت نام کاربر جدید

/request-otp
متد post
درخواست کدOTP

/verify-otp
متد post
تائید کد OTP



*************************
نظرات api/comments

/ 
متد post 
ایجاد نظر جدید
مجوز با middleware auth

/
متد get
req body => postId 
دریافت نطرات پست

/:commentId
متد patch
ویرایش نظر
مجوز با middleware auth

/:commentId
متد delete
حذف نظر
مجوز با middleware auth



***********************
پست ها api/posts/

/
متد post 
ایجاد پست جدید

/
متد get
دریافت لیست پست ها 


*******************************

# مراحل استفاده 

کلون ریپازیتوری

1.git clone https://github.com/mohadese-Kh-2002/nested-comments-ir
cd nested-comments-ir

2.npm install


ساخت فایل3 .env در ریشه پروژه
PORT=3000
MONGODB_URI=mongodb://localhost:27017/nested-comments
SECRET_JWT=your-jwt-secret-key
NODE_ENV=development

4.npm start