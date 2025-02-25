import { HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { SignUpDto } from "./dto/signup.dto";
import * as argon from "argon2";
import { LoginDto } from "./dto/login.dto";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        @InjectQueue("emailQueue") private emailQueue: Queue
    ) { }

    async signUp(signUp: SignUpDto) {
        const prisma = this.prismaService;
        const transaction = await prisma.$transaction(async (prisma) => {
            try {
                const hashedPassword = await argon.hash(signUp.password);
                const practice = await prisma.practice.create({
                    data: {
                        name: signUp.name,
                        email: signUp.email,
                        password: hashedPassword
                    }
                })
                if (!practice)
                    throw new HttpException("Error while creating practice", 500);
                const tenantSchema = `${practice.id}`;
                await prisma.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS ${tenantSchema}`);

                await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS "${tenantSchema}".patient(
                    id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL,
                    age INT NOT NULL,
                    createdAt TIMESTAMP NOT NULL DEFAULT now()
    
                )`)

                await this.emailQueue.add("sendWelcomeEmail", { email: signUp.email, name: signUp.name });


                return {
                    mesaage: "Signup Successfull",
                    data: practice
                }

            } catch (error) {
                console.error("Error while Signup", error);
                return {
                    message: error.messag
                }
            }
        })
        return transaction;
    }
    async login(login: LoginDto) {
        try {
            const { email, password } = login;
            const practice = await this.prismaService.practice.findUnique({
                where: {
                    email: email
                }
            })

            if (!practice) {
                throw new UnauthorizedException("Invalid credentials");
            }
            const hashedPassword = practice.password;
            const passwordVaild = await argon.verify(hashedPassword, password);

            if (!passwordVaild) {
                throw new UnauthorizedException("Invalid credentials");
            }

            const payload = {
                id: practice.id, email: practice.email
            }
            const jwtToken = this.jwtService.sign(payload);
            return { accessToken: jwtToken, message: "Login Successfull" };

        } catch (error) {
            console.error("Error while login", error);
            return {
                message: error.message
            }
        }

    }

}