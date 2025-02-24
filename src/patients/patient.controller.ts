import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { PatientService } from "./patients.service";
import { CreatePatientDto } from "./dto/createPatientDto.dto";
import { Request } from "express";

@Controller("/api/v1/patients")

export class PatientController {
    constructor(private readonly patientService: PatientService) { }

    @Post("/:practiceId")
    async addPatient(@Param("practiceId") practiceId: string, @Body() patientDto: CreatePatientDto) {

        return this.patientService.addPatient(practiceId, patientDto);

    }

    @Get("/:practiceId")
    async getPatients(@Param("practiceId") practiceId: string) {
        return this.patientService.getPatients(practiceId);
    }
}