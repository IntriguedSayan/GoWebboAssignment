import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PracticeService {
    constructor(private readonly prismaService: PrismaService) { }
    async getAllPractices() {
        try {
            const practices = await this.prismaService.practice.findMany();
            return {
                message: "All registered practices fectched successfully",
                practices
            }
        } catch (err) {
            console.log(err);
            return { message: err.message }
        }
    }
}