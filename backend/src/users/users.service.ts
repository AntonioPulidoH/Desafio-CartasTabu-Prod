import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/user-create.dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async findEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
            include: {role: true}
        });
    }

    async create(data: CreateUserDto) {
  const isValidEmail = (email: string): boolean => {
    const emailVerified = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailVerified.test(email)
  }

  const isValidPassword = (password: string): boolean => {
    const passwordVerified = /^(?=.*[A-Z])(?=.*\d).{8,}$/
    return passwordVerified.test(password)
  }

  //Validaciones
  if (!data.email || !isValidEmail(data.email)) {
    throw new BadRequestException('EMAIL_INVALIDO')
  }

  if (!data.password || !isValidPassword(data.password)) {
    throw new BadRequestException('PASSWORD_INVALIDA')
  }

  if (!data.name || !data.lastName) {
    throw new BadRequestException('DATOS_OBLIGATORIOS')
  }


  const userExists = await this.findEmail(data.email)

  if (userExists) {
    throw new ConflictException('EMAIL_YA_REGISTRADO')
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)

  
  return this.prisma.user.create({
    data: {
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      educationalCenter: data.educationalCenter ?? null,
      roleId: 1,
      vocationalFamilyId: data.vocationalFamilyId ?? null,
    },
  });
}
}
