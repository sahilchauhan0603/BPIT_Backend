import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class CreateSocietyService {
  async sendSocietyRegistrationEmail(
    societyName: string,
    headName: string,
    dateOfRegistration: string,
    societyImage: string,
    category: string,
    mobileNo: string,
    email: string,
    website: string,
    description: string,
  ): Promise<void> {
    const emailUser = process.env.EMAIL_USER;

    if (!emailUser) {
      throw new Error('Email credentials are not configured');
    }

    const emailBody = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Create Society Form Submission</title>
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
                <h2>New Society Registration Request Form</h2>
            </div>
            <div class="content">
                <p><strong>Society Name:</strong> ${societyName}</p>
                <h3>Society Head Details:</h3>
                <p><strong>Society Head Name:</strong> ${headName}</p>
                <p><strong>Society Head Email:</strong> ${email}</p>
                <p><strong>Society Head Contact No:</strong> ${mobileNo}</p>
                <p><strong>Society's Website:</strong> ${website}</p>
                <p><strong>Society's Image Url:</strong> ${societyImage}</p>
                <p><strong>Society's Category:</strong> ${category}</p>
                <p><strong>Society's Date of Registration:</strong> ${dateOfRegistration}</p>
                <p><strong>Society's Description:</strong></p>
                <p>${description}</p>
            </div>
            <div class="footer">
                <p>This message was sent from the BPIT Society Management System.</p>
            </div>
        </div>
    </body>
    </html>
    `;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: emailUser,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: emailUser,
      to: emailUser,
      subject: 'New Society Registration Request Form Submission',
      html: emailBody,
    });
  }
}
