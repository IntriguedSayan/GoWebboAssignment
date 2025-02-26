import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PracticeService } from "./practices.service";

@Controller("practices")
export class PracticesController {

    constructor(private practiceService: PracticeService) { }

    @Get()
    async getAllPractices() {
        return this.practiceService.getAllPractices();
    }

}