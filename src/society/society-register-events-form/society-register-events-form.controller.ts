import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { RegisterEventsService } from './society-register-events-form.service';

@Controller('api/v1/registerEvent')
export class RegisterEventsController {
  constructor(private readonly registerEventsService: RegisterEventsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handleRegisterEventForm(@Body() formData: any) {
    try {
      const { name, email, batch, branch, enrollment, society } = formData;

      await this.registerEventsService.sendEventRegistrationEmail(
        name,
        email,
        batch,
        branch,
        enrollment,
        society,
      );

      return {
        message: 'Event registration email sent successfully',
      };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new HttpException(
        'Failed to send event registration email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
