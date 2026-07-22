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
import dns from "dns";

// Node ko globally bol do ki sabse pehle IPv4 resolve kare
dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
  // Strict typing workaround for nodemailer lookup
  lookup: (hostname, _options, callback) => {
    dns.lookup(hostname, 4, (err, address, family) => {
      callback(err, address, family);
    });
  },
} as any);

export default transporter;