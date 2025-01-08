import { Module } from '@nestjs/common';
import { MailServiceService } from './mail-service.service';

@Module({
  providers: [MailServiceService],
  exports: [MailServiceService],
})
export class MailServiceModule {}
