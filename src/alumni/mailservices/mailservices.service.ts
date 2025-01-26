import { Injectable } from '@nestjs/common';
import { EmailTemplates } from './Templates/email-template';
import { MailServiceService } from 'src/mail-service/mail-service.service';

@Injectable()
export class MailservicesService {
    constructor(private readonly mailService: MailServiceService) {}
    async sendContactUsEmail(
        name: string,
        email: string,
        message: string,
        phone: string,
        subject: string,
    ): Promise<{ success: boolean; message: string }> {
        const adminMail = process.env.ADMIN_MAIL;
        if (!adminMail) {
          return {
            success: false,
            message: 'Admin email is not configured in the environment variables',
          };
        }
      
        const emailBody = EmailTemplates.contactUs(name, message, email, phone, subject);
      
        try {
          const result = await this.mailService.sendMail(
            adminMail,
            'New Contact Us Form Submission',
            emailBody,
          );
      
          if (result.success) {
            return {
              success: true,
              message: 'Contact Us email successfully sent to the admin',
            };
          } else {
            return {
              success: false,
              message: `Failed to send Contact Us email: ${result.message}`,
            };
          }
        } catch (error) {
          const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
          console.error('Error sending Contact Us email:', errorMessage);
          return {
            success: false,
            message: `An error occurred while sending the Contact Us email: ${errorMessage}`,
          };
        }
    }
      
    async sendFeedbackEmail(
        name: string,
        email: string,
        feedback: string,
    ): Promise<{ success: boolean; message: string }> {
        const adminMail = process.env.ADMIN_MAIL;
        if (!adminMail) {
          return {
            success: false,
            message: 'Admin email is not configured in the environment variables',
          };
        }
      
        const emailBody = EmailTemplates.feedback(name, email, feedback);
      
        try {
          const result = await this.mailService.sendMail(
            adminMail,
            'New Feedback Form Submission',
            emailBody,
          );
      
          if (result.success) {
            return {
              success: true,
              message: 'Feedback email successfully sent to the admin',
            };
          } else {
            return {
              success: false,
              message: `Failed to send Feedback email: ${result.message}`,
            };
          }
        } catch (error) {
          const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
          console.error('Error sending Feedback email:', errorMessage);
          return {
            success: false,
            message: `An error occurred while sending the Feedback email: ${errorMessage}`,
          };
        }
    }
}
