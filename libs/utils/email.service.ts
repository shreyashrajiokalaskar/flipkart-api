import { IEmailOptions } from "libs/interfaces/common.interface";
import nodemailer, { Transporter } from "nodemailer";
import DOT_ENV from "../../config.env";

export class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: DOT_ENV.mailerHost || "smtp.gmail.com", // Change to your SMTP host
      port: Number(DOT_ENV.mailerPort) || 587,
      secure: false, // true for port 465, false for others
      auth: {
        user: DOT_ENV.mailerUsername || "your-email@gmail.com", // Your email
        pass: DOT_ENV.mailerPassword || "your-email-password", // Your password or app password
      },
    });
  }

  async sendEmail(mailOptions: IEmailOptions): Promise<void> {
    try {
      const { to, subject, text, html } = mailOptions;
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html,
      });
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error(`Error sending email to ${mailOptions.to}:`, error);
      throw new Error("Failed to send email");
    }
  }
}
