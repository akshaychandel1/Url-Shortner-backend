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
  port: 587,
  secure: false, // Port 587 ke liye false (STARTTLS)
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD, // Must be an 16-character App Password
  },
  family: 4, // Bypasses IPv6 issue on Render
} as nodemailer.TransportOptions);

export default transporter;