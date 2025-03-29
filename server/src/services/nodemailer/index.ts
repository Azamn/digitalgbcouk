import { appEnvConfigs } from "@src/configs";
import nodemailer, { Transporter } from "nodemailer";

class MailService {
  private static transporter: Transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: appEnvConfigs.AUTH_EMAIL,
      pass: appEnvConfigs.AUTH_PASS,
    },
  });

  private static buildCredentialsEmailTemplate(
    email: string,
    password: string,
    role: string
  ): string {
    return `
      <div style="
  font-family: 'Inter', sans-serif;
  background: #000;
  color: #fff;
  padding: 40px 20px;
  text-align: center;
">
  <div style="
    max-width: 600px;
    margin: 0 auto;
    background: #111;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(255,255,255,0.1);
    overflow: hidden;
    border: 1px solid #333;
  ">
    <div style="background: #fff; height: 4px;"></div>

    <div style="padding: 40px 30px;">
      <h2 style="color: #fff; margin-bottom: 16px; font-size: 24px;">
        Welcome to Social-X! 🎉
      </h2>

      <p style="color: #aaa; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
        Below are your login credentials. Keep them safe and use them to access your account.
      </p>

      <div style="
        background: #222;
        padding: 15px;
        border-radius: 8px;
        font-size: 16px;
        line-height: 1.6;
        color: #fff;
        margin-bottom: 20px;
        display: inline-block;
        text-align: left;
        width: 100%;
        font-family: 'Courier New', monospace;
      ">
        <strong>Email:</strong> <span style="color: #4A90E2;">${email}</span> <br />
        <strong>Password:</strong> <span style="color: #4A90E2;">${password}</span> <br />
        <strong>Role:</strong> <span style="color: #4A90E2;">${
          role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
        }</span>
      </div>

      <button style="
        background: #4A90E2;
        color: #ffffff;
        padding: 12px 24px;
        font-size: 16px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        font-weight: 600;
        transition: background 0.3s ease;
      " onclick="navigator.clipboard.writeText('Email: ${email}\\nPassword: ${password}\\nRole: ${role}'); alert('Credentials copied!');">
        📋 Copy Credentials
      </button>

      <p style="
        color: #777;
        font-size: 12px;
        margin-top: 30px;
      ">
        If you didn’t expect this email, you can safely ignore it.
      </p>
    </div>

    <div style="
      background: #000;
      padding: 20px;
      font-size: 12px;
      color: #777;
      border-top: 1px solid #333;
    ">
      © ${new Date().getFullYear()} Social-X. All rights reserved.
    </div>
  </div>
</div>
    `;
  }

  public static async sendUserCredentials(options: {
    email: string;
    password: string;
    Role: string;
  }) {
    const { email, password, Role } = options;

    try {
      const subject = "Your Account Credentials - Digitalgb";
      const htmlContent = this.buildCredentialsEmailTemplate(
        email,
        password,
        Role
      );

      const mailOptions = {
        from: `"Digitalgb" <${appEnvConfigs.AUTH_EMAIL}>`,
        to: email,
        subject,
        html: htmlContent,
      };

      const info = await this.transporter.sendMail(mailOptions);

      console.log(`✅ Credentials email sent to ${email}: ${info.messageId}`);
    } catch (error) {
      console.error(`❌ Error sending credentials email to ${email}:`, error);
      throw new Error(`Failed to send credentials email to ${email}`);
    }
  }
}

export default MailService;
