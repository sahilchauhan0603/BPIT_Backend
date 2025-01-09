import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SocietyQueryService {
  private societyEmails = {
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

  async sendQueryEmail(
    studentName: string,
    society: string,
    batch: string,
    branch: string,
    enrollmentNo: number,
    query: string,
  ): Promise<void> {
    const societyEmail = this.societyEmails[society];
    if (!societyEmail) {
      throw new Error('Invalid society selected');
    }

    const emailBody = `
      <p>Student Name: ${studentName}</p>
      <p>Society: ${society}</p>
      <p>Batch: ${batch}</p>
      <p>Branch: ${branch}</p>
      <p>Enrollment No: ${enrollmentNo}</p>
      <p>Query: ${query}</p>
    `;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: societyEmail,
      subject: 'SOCIETY QUERY FORM',
      html: emailBody,
    });
  }
}
