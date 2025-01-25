import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class FeedbackService {
  async sendFeedbackEmail(feedback: string): Promise<void> {
    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;

    if (!emailUser || !emailPassword) {
      throw new Error('Email credentials are not configured');
    }

    const emailBody = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>New Feedback Form Submission</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
              }
              .container {
                  padding: 20px;
              }
              .header {
                  background-color: #f8f9fa;
                  padding: 10px 20px;
                  border-bottom: 1px solid #dee2e6;
              }
              .content {
                  margin: 20px 0;
              }
              .footer {
                  background-color: #f8f9fa;
                  padding: 10px 20px;
                  border-top: 1px solid #dee2e6;
                  text-align: center;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h2>New Feedback Form Submission</h2>
              </div>
              <div class="content">
                  <p><strong>Feedback:</strong></p>
                  <p>${feedback}</p>
              </div>
              <div class="footer">
                  <p>This message was sent from the BPIT Society Website Feedback form.</p>
              </div>
          </div>
      </body>
      </html>
    `;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });

    await transporter.sendMail({
      from: emailUser,
      to: emailUser,
      subject:
        'New Feedback Form Submission from BPIT Society Management Website',
      html: emailBody,
    });
  }
}
