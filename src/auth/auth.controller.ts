import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, VerifyEmailDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('login')
    async login(@Body() body: LoginDto) {
        // Implement login logic here
        return this.authService.login(body.email, body.password);
    }

    @Post('register')
    async register(@Body() body: RegisterDto) {
        // Implement registration logic here
        return this.authService.register(body);
    }

    // @Post('logout')
    // async logout() {
    //     // Implement logout logic here
    //     return this.authService.logout();
    // }

    @Post('forgot-password')
    async forgotPassword() {
        // Implement forgot password logic here
        return this.authService.forgotPassword();
    }
    
    @Post('verify-email')
    async verifyEmail(@Body() body : VerifyEmailDto) {
        // Implement email verification logic here
        return this.authService.verifyEmail(body.token);
    }

}
