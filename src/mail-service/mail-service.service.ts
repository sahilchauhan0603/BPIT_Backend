import { Injectable } from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';

@Injectable()
export class MailServiceService {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async sendMail(
    to: string,
    subject: string,
    html: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const mailOptions = {
        from: process.env.MAIL_USER,
        to,
        subject,
        html,
      };

      await this.transporter.sendMail(mailOptions);

      return {
        success: true,
        message: `Email successfully sent to ${to}`,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error sending email:', errorMessage);

      return {
        success: false,
        message: `Failed to send email: ${errorMessage}`,
      };
    }
  }

  async sendMailToMany(
    recipients: string[],
    subject: string,
    html: string,
    attachments: { filename: string; path: string }[] = [],
  ): Promise<{ success: boolean; message: string }> {
    try {
      if (!recipients || recipients.length === 0) {
        throw new Error('Recipients list cannot be empty');
      }

      const mailOptions = {
        from: process.env.MAIL_USER,
        to: undefined, // Leave undefined to use BCC for bulk emails
        bcc: recipients.join(','), // Use BCC for privacy
        subject,
        html,
        attachments, // Optional attachments
      };

      await this.transporter.sendMail(mailOptions);

      return {
        success: true,
        message: `Emails successfully sent to ${recipients.length} recipients.`,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error sending bulk emails:', errorMessage);

      return {
        success: false,
        message: `Failed to send emails: ${errorMessage}`,
      };
    }
  }
}
