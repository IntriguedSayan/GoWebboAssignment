import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePatientDto } from "./dto/createPatientDto.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class PatientService {
    constructor(private readonly prismaService: PrismaService) { }

    async addPatient(practiceId: string, patientDto: CreatePatientDto) {
        try {
            await this.prismaService.setSchema(`${practiceId}`);
            const patient = await this.prismaService.$executeRawUnsafe(
                `INSERT INTO patient (name, age, createdat) VALUES ($1, $2, now()) RETURNING *`, patientDto.name, patientDto.age
            );

            if (!patient)
                throw new HttpException("Falied to add patient", 400);
            return {
                message: "Patient added successfully"
            }

        } catch (err) {
            console.log(err);
            return {
                message: err.message
            }
        }

    }

    async getPatients(practiceId: string) {

        try {

            await this.prismaService.setSchema(`${practiceId}`);
            const data = await this.prismaService.$queryRaw(Prisma.sql`SELECT * FROM patient`);
            if (!data)
                throw new HttpException("Failed to fetch patients", 400);
            return {
                message: "Patients fetched successfully",
                data
            }

        } catch (err) {

            console.log(err);
            return {
                message: err.message
            }

        }

    }

}