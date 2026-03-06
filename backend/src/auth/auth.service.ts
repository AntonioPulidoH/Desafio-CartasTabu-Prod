import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { googleVerify } from './google/google-verify';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValidPassword = await bcrypt.compare(pass, user.password);
    if (!isValidPassword) throw new UnauthorizedException('Invalid credentials');

    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role?.name || 'USER'
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async googleLogin(idToken: string) {
    const googleUser = await googleVerify(idToken);
    if (!googleUser.email) throw new UnauthorizedException('No email');

    const existingUser = await this.usersService.findEmail(googleUser.email);
    let user;

    if (!existingUser) {
      const randomPassword = Math.random().toString(36).slice(-8) +
        Math.random().toString(36).toUpperCase().slice(-8);

      user = await this.usersService.create({
        email: googleUser.email,
        name: googleUser.name,
        lastName: googleUser.lastName,
        password: randomPassword,
        roleId: 3,
      });
    } else {
      user = existingUser;
    }

    return this.login(user);
  }

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create({
      ...registerDto,
      password: registerDto.password,
      roleId: 3
    });
    const { password, ...result } = user;
    return this.login(result);
  }
}
