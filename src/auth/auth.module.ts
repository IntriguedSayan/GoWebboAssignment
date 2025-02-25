import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BullModule } from '@nestjs/bull';

@Module({
    imports: [
        PrismaModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'YOUR_SECRET_KEY', // use env variables in production
            signOptions: { expiresIn: '1d' },
        }),
        BullModule.registerQueue({name:"emailQueue"}),

    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { }
