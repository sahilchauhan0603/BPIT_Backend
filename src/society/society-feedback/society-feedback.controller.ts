import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { FeedbackService } from './society-feedback.service';

@Controller('api/v1/feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  async handleFeedback(@Body() feedbackDto: { feedback: string }) {
    const { feedback } = feedbackDto;

    if (!feedback) {
      throw new HttpException('Feedback is required', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.feedbackService.sendFeedbackEmail(feedback);
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
