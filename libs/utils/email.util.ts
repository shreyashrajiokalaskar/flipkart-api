import { IEmailOptions } from "interfaces/common.interface";
import nodemailer, { Transporter } from "nodemailer";
import DOT_ENV from "../../config.env";


class Mailer {
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

  public async sendMail(options: IEmailOptions): Promise<void> {
    try {
      const info = await this.transporter.sendMail({
        from: `"Your App" <${process.env.SMTP_USER}>`, // Sender address
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      });

      console.log("Email sent: %s", info.messageId);
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email.");
    }
  }
}

export default new Mailer();
