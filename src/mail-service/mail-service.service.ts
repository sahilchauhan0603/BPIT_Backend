/* eslint-disable prettier/prettier */
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

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to,
      subject,
      html,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
