import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmailModule } from './email/email.module';
import { BullModule } from '@nestjs/bull';
import { PracticesModule } from './practices/practices.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT) as number || 6379,
        password: process.env.REDIS_PASSWORD
      }
    }),
    BullModule.registerQueue({
      name: "emailQueue",
    }),
    AuthModule,
    PatientsModule,
    PrismaModule,
    EmailModule,
    PracticesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
