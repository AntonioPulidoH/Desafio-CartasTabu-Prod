import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  
}
