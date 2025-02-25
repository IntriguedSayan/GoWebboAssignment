import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EmailProcessor } from './email.processor';

@Module({
    imports: [
        BullModule.registerQueue({
            name: "emailQueue"
        })
    ],
    providers:[EmailProcessor]
})
export class EmailModule {}
