import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SocietyModule } from './society/society.module';

@Module({
  imports: [PrismaModule, SocietyModule],
})
export class AppModule {}
