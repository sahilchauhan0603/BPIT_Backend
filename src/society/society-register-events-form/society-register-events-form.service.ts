import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class RegisterEventsService {
  async sendEventRegistrationEmail(
    name: string,
    email: string,
    batch: string,
    branch: string,
    enrollment: number,
    society: string,
  ): Promise<void> {
    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;

    if (!emailUser || !emailPassword) {
      throw new Error('Email credentials are not configured');
    }

    const societies = {
      Namespace: 'jyoti43cseb22@bpitindia.edu.in',
      Anveshan: 'parth83cseb22@bpitindia.edu.in',
      HashDefine: 'mohit84cseb22@bpitindia.edu.in',
      WIBD: 'jyoti43cseb22@bpitindia.edu.in',
      GDSC: 'sahil82cseb22@bpitindia.edu.in',
      WIE: 'jyoti43cseb22@bpitindia.edu.in',
      IEEE: 'sahil82cseb22@bpitindia.edu.in',
      Electonauts: 'harsh63cseb22@bpitindia.edu.in',
      Dhrishti: 'jyoti43cseb22@bpitindia.edu.in',
      OptiClick: 'tanmay59cseb22@bpitindia.edu.in',
      Avaran: 'tanmay59cseb22@bpitindia.edu.in',
      Octave: 'ritesh100cseb22@bpitindia.edu.in',
      Panache: 'sahil82cseb22@bpitindia.edu.in',
      Mavericks: 'sahil82cseb22@bpitindia.edu.in',
      Kalam: 'sahil82cseb22@bpitindia.edu.in',
      Chromavita: 'sahil82cseb22@bpitindia.edu.in',
    };

    const societyEmail = societies[society];
    if (!societyEmail) {
      throw new Error('Invalid society selected');
    }

    const emailBody = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Event Registration Form Submission</title>
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
                  <h2>I want to register for the event that your society is conducting</h2>
              </div>
              <div class="content">
                  <p><strong>Student Name:</strong> ${name}</p>
                  <p><strong>Enrollment No:</strong> ${enrollment}</p>
                  <p><strong>Branch:</strong> ${branch}</p>
                  <p><strong>Batch Year:</strong> ${batch}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Society To Join:</strong> ${society}</p>
              </div>
              <div class="footer">
                  <p>This message was sent from the BPIT Society Management Event Form.</p>
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
      to: societyEmail,
      subject:
        'New Event Registration Form Submission from BPIT Society Management Portal',
      html: emailBody,
    });
  }
}
