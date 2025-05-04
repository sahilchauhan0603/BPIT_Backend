import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailServiceService } from 'src/mail-service/mail-service.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtService, MailServiceService]
})
export class AuthModule {}
