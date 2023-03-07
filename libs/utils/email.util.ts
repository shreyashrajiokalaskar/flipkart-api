import { createTransport } from "nodemailer";

// export const sendEmail = async (options) => {
//   const transporter = createTransport({
//     host: "",
//     port: process.env.MAILER_PORT,
//     auth: {
//       user: process.env.MAILER_USER_NAME,
//       pass: process.env.MAILER_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: "Shreyash Kalaskar <shreyashrajiokalaskar@gmail.com>",
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//     // html: options.html,
//   };

//   await transporter.sendMail(mailOptions);
// };
