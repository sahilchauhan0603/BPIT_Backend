import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { MailservicesService } from './mailservices.service';
import { ContactUsDto, FeedbackDto } from './dto/index';

@Controller('alumni/mailservices')
export class MailservicesController {
  private readonly mailService: MailservicesService;

  @Post('contact-us')
  async sendContactUsEmail(@Body() contactUsDto: ContactUsDto) {
    const { name, email, message, phone, subject } = contactUsDto;

    try {
      const result = await this.mailService.sendContactUsEmail(
        name,
        email,
        message,
        phone,
        subject,
      );
      if (result.success) {
        return { success: true, message: result.message };
      } else {
        throw new HttpException(
          result.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      throw new HttpException(
        error instanceof Error
          ? error.message
          : 'An error occurred while processing your request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('feedback')
  async sendFeedbackEmail(@Body() feedbackDto: FeedbackDto) {
    const { name, email, feedback } = feedbackDto;

    try {
      const result = await this.mailService.sendFeedbackEmail(
        name,
        email,
        feedback,
      );
      if (result.success) {
        return { success: true, message: result.message };
      } else {
        throw new HttpException(
          result.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      throw new HttpException(
        error instanceof Error
          ? error.message
          : 'An error occurred while processing your request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
