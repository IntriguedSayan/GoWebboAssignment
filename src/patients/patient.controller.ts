import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { PatientService } from "./patients.service";
import { CreatePatientDto } from "./dto/createPatientDto.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Request } from "express";
interface User {
    practiceId: string;
}

export interface CustomRequest extends Request {
    user: User;
}

@Controller("/api/v1/patients")
@UseGuards(JwtAuthGuard)

export class PatientController {
    constructor(private readonly patientService: PatientService) { }

    @Post()
    async addPatient(
        // @Param("practiceId") practiceId: string, @Body() patientDto: CreatePatientDto
        @Req() req: CustomRequest, @Body() patientDto: CreatePatientDto
    ) {
        const practiceId = req?.user.practiceId;

        return this.patientService.addPatient(practiceId, patientDto);

    }

    @Get()
    async getPatients(
        // @Param("practiceId") practiceId: string
        @Req() req: CustomRequest
    ) {
        const practiceId = req?.user.practiceId;
        return this.patientService.getPatients(practiceId);
    }

    @Delete(":id")
    async deletePatient(@Req() req: CustomRequest, @Param("id") id: string) {
        const practiceId = req?.user.practiceId;
        const patientId = parseInt(id, 10);
        return this.patientService.deletePatient(practiceId, patientId);
    }
}