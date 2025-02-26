import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { PracticesController } from "./paractices.controller";
import { PracticeService } from "./practices.service";

@Module({
    imports:[PrismaModule],
    controllers:[PracticesController],
    providers:[PracticeService],
})

export class PracticesModule{}