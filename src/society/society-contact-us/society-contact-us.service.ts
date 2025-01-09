import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactService {
  async sendContactEmail(
    name: string,
    email: string,
    contactNo: string,
    batch: string,
    branch: string,
    society: string,
    subject: string,
    message: string,
  ): Promise<void> {
    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;

    if (!emailUser || !emailPassword) {
      throw new Error('Email credentials are not configured');
    }

    const emailBody = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>New Contact Us Form Submission</title>
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
                  <h2>New Contact Us Form Submission</h2>
              </div>
              <div class="content">
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Contact No:</strong> ${contactNo}</p>
                  <p><strong>Batch:</strong> ${batch}</p>
                  <p><strong>Branch:</strong> ${branch}</p>
                  <p><strong>Society:</strong> ${society}</p>
                  <p><strong>Subject:</strong> ${subject}</p>
                  <p><strong>Message:</strong></p>
                  <p>${message}</p>
              </div>
              <div class="footer">
                  <p>This message was sent from the BPIT Society Management Contact Us form.</p>
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
        'New Contact Us Form Submission from BPIT Society Management Portal',
      html: emailBody,
    });
  }
}
