import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [AuthModule, PatientsModule, PrismaModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
