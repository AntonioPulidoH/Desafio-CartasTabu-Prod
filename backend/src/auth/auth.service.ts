import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findEmail(email);

    if (!user || !user.password) {
        throw new UnauthorizedException('Invalid credentials');
    }

    const isHashedPassword = user.password.startsWith('$2a$') ||
      user.password.startsWith('$2b$') ||
      user.password.startsWith('$2y$');

    const isValidPassword = 
      pass === user.password || (isHashedPassword && await compare(pass, user.password))

    if(!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const { password, ...safeUser} = user
    return safeUser
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

