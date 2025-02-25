import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";
import * as nodemailer from "nodemailer";
import { from } from "rxjs";

@Processor("emailQueue")
export class EmailProcessor {
    private readonly logger = new Logger(EmailProcessor.name);
    private emailSender;

    constructor() {
        this.emailSender = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        })
    }
    @Process("sendWelcomeEmail")
    async handleWelcomeEmail(job: Job<{ email: string, name: string }>) {
        try {
            const { email, name } = job.data;
            this.logger.log(`Sending welcome email to ${email} for practice ${name}`);

            const mailOptions = {
                from: process.env.EMAIL_FROM || "no-reply@example.com",
                to: email,
                subject: "Welcome to Our Service!",
                text: `Hello ${name}, welcome to our platform.`,
                html: `<h2>Hello ${name},</h2><h2>Welcome to our platform.</h2>`,

            }

            const info = this.emailSender.sendMail(mailOptions);

            this.logger.log(`Welcome email sent: ${info.messageId}`);

        } catch (err) {
            this.logger.error(`Failed to send welcome email to ${err.message + "----" + err}`);
            throw new Error(`Failed to send welcome email to ${job.data.email}`);
        }
        this.logger.debug(`Sending welcome email to ${job.data.email}`);

    }
}