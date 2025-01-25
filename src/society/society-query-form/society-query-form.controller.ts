import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { SocietyQueryService } from './society-query-form.service';

@Controller('api/v1/societyQuery')
export class SocietyQueryController {
  constructor(private readonly societyQueryService: SocietyQueryService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handleSocietyQueryForm(@Body() formData: any) {
    try {
      const { studentName, society, batch, branch, enrollmentNo, query } =
        formData;

      await this.societyQueryService.sendQueryEmail(
        studentName,
        society,
        batch,
        branch,
        enrollmentNo,
        query,
      );

      return {
        message: 'Mail sent successfully to the respective society',
      };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new HttpException(
        'Failed to send email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
