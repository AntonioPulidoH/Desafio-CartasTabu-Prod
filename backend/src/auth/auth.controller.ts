import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() body: LoginDto) {
        try {
            const user = await this.authService.validateUser(body.email, body.password);
            return this.authService.login(user);
        } catch (error) {
            console.error('ValidateUser FAILED:', error.message);
            throw new UnauthorizedException(error.message || 'Invalid credentials');
        }
    }

    @Post('google')
    async googleSignin(@Body('id_token') id_token: string) {
        return this.authService.googleLogin(id_token);
    }

    @Post('register')
    @HttpCode(HttpStatus.OK)
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
}
