import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";

@Controller("api/v1/auth")

export class AuthController {
    constructor(private readonly authService: AuthService) {

    }

    @Post("signup")
    async signUp(@Body() signUpData: SignUpDto) {
        return this.authService.signUp(signUpData);
    }

    @Post("login")
    async login(@Body() loginData: LoginDto) {
        return this.authService.login(loginData);
    }


}