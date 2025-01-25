import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ContactService } from './society-contact-us.service';

@Controller('api/v1/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async handleContactUs(
    @Body()
    contactDto: {
      name: string;
      email: string;
      contactNo: string;
      batch: string;
      branch: string;
      society: string;
      subject: string;
      message: string;
    },
  ) {
    const { name, email, contactNo, batch, branch, society, subject, message } =
      contactDto;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.contactService.sendContactEmail(
        name,
        email,
        contactNo,
        batch,
        branch,
        society,
        subject,
        message,
      );
      return { message: 'Mail sent successfully' };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new HttpException(
        'Failed to send email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
