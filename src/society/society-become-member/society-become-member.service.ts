import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class BecomeMemberService {
  async sendMembershipEmail(
    enrollmentNo: number,
    firstName: string,
    lastName: string,
    branch: string,
    batchYear: string,
    mobileNo: string,
    email: string,
    profilePicture: string,
    society: string,
    societyPosition: string,
    domainExpertise: string,
    githubProfile: string,
    linkedInProfile: string,
    twitterProfile: string,
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
          <title>New Membership Form Submission</title>
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
                  <h2>I want to join your society</h2>
              </div>
              <div class="content">
                  <p><strong>Student Name:</strong> ${firstName} ${lastName}</p>
                  <p><strong>Enrollment No:</strong> ${enrollmentNo}</p>
                  <p><strong>Branch:</strong> ${branch}</p>
                  <p><strong>Batch Year:</strong> ${batchYear}</p>
                  <p><strong>Mobile No:</strong> ${mobileNo}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Profile Picture:</strong> <a href="${profilePicture}">Profile Picture</a></p>
                  <p><strong>Society:</strong> ${society}</p>
                  <p><strong>Society Position:</strong> ${societyPosition}</p>
                  <p><strong>Domain Expertise:</strong> ${domainExpertise}</p>
                  <p><strong>GitHub Profile:</strong> <a href="${githubProfile}">GitHub Profile</a></p>
                  <p><strong>LinkedIn Profile:</strong> <a href="${linkedInProfile}">LinkedIn Profile</a></p>
                  <p><strong>Twitter Profile:</strong> <a href="${twitterProfile}">Twitter Profile</a></p>
              </div>
              <div class="footer">
                  <p>This message was sent from the BPIT Society Management Membership Form.</p>
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
        'New Become Member Form Submission from BPIT Society Management Portal',
      html: emailBody,
    });
  }
}
