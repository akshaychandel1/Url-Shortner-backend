// import nodemailer from "nodemailer";


// const transporter = nodemailer.createTransport({

//     service:"gmail",

//     auth:{
//         user:process.env.SMTP_EMAIL,
//         pass:process.env.SMTP_PASSWORD
//     }

// });


// export default transporter;








import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Port 465 ke liye true
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD, // Make sure ye App Password ho!
  },
  // 🔥 YE LINE PRODUCTION KA ISSUE FIX KAREGI
  family: 4, 
} as nodemailer.TransportOptions);

export default transporter;