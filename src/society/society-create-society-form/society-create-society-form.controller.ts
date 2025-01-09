import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateSocietyService } from './society-create-society-form.service';

@Controller('api/v1/societyCreateForm')
export class CreateSocietyController {
  constructor(private readonly createSocietyService: CreateSocietyService) {}

  @Post()
  async createSociety(
    @Body()
    createSocietyDto: {
      societyName: string;
      headName: string;
      dateOfRegistration: string;
      societyImage: string;
      category: string;
      mobileNo: string;
      email: string;
      website: string;
      describe: string;
    },
  ) {
    const {
      societyName,
      headName,
      dateOfRegistration,
      societyImage,
      category,
      mobileNo,
      email,
      website,
      describe,
    } = createSocietyDto;

    // Validate required fields
    if (
      !societyName ||
      !headName ||
      !dateOfRegistration ||
      !category ||
      !mobileNo ||
      !email ||
      !website ||
      !describe
    ) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.createSocietyService.sendSocietyRegistrationEmail(
        societyName,
        headName,
        dateOfRegistration,
        societyImage,
        category,
        mobileNo,
        email,
        website,
        describe,
      );
      return { message: 'Society registration mail sent successfully' };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new HttpException(
        'Failed to send email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
