import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Request,
  Put
} from "@nestjs/common";
import { CreateUserDto } from "./dto/user-create.dto";
import { UsersService } from "./users.service";
import { UpdateUserRoleDto, UpdateUserDto } from "./dto/update-user-dto";
import { AuthService } from 'src/auth/auth.service';

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

  @Post("register")
  @HttpCode(HttpStatus.OK)
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto)
    const userWithRole = await this.usersService.findEmail(user.email)
    return this.authService.login(userWithRole);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return this.usersService.findOne(req.user.userId)
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(":id/role")
  updateRole(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.usersService.updateRole(id, updateUserRoleDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @Put('me')
  @UseGuards(JwtAuthGuard)
  updateMe(@Request() req, @Body() data: UpdateUserDto) {
    return this.usersService.updateMe(req.user.userId, data)
  }
}