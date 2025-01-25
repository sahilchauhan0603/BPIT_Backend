import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BecomeMemberService } from './society-become-member.service';

@Controller('api/v1/becomeMember')
export class BecomeMemberController {
  constructor(private readonly becomeMemberService: BecomeMemberService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handleBecomeMemberForm(@Body() formData: any) {
    try {
      const {
        enrollmentNo,
        firstName,
        lastName,
        branch,
        batchYear,
        mobileNo,
        email,
        profilePicture,
        society,
        societyPosition,
        domainExpertise,
        githubProfile,
        linkedInProfile,
        twitterProfile,
      } = formData;

      await this.becomeMemberService.sendMembershipEmail(
        enrollmentNo,
        firstName,
        lastName,
        branch,
        batchYear,
        mobileNo,
        email,
        profilePicture,
        society,
        societyPosition,
        domainExpertise,
        githubProfile,
        linkedInProfile,
        twitterProfile,
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
