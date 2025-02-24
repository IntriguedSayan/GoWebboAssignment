import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patients.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [PatientController],
    providers: [PatientService],
})
export class PatientsModule {}
