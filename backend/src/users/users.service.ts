import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/user-create.dto";
import * as bcrypt from "bcryptjs";
import { UpdateUserRoleDto } from "./dto/update-user-dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        educationalCenter: true,
        vocationalFamily: {
          select: {
            name: true
          }
        },
        role: {
          select: {
            name:true
          }
        }
      }
    })
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

    if(!data.email || !isValidEmail(data.email)) {
      throw new BadRequestException("EMAIL_INVALIDO");
    }

    if (!data.password || !isValidPassword(data.password)) {
      throw new BadRequestException("PASSWORD_INVALIDA");
    }

    if (!data.name || !data.lastName) {
      throw new BadRequestException("DATOS_OBLIGATORIOS");
    }

    const userExists = await this.findEmail(data.email);

    if (userExists) {
      throw new ConflictException("EMAIL_YA_REGISTRADO");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        educationalCenter: data.educationalCenter ?? null,
        roleId: 3,
        vocationalFamilyId: data.vocationalFamilyId ?? null,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        educationalCenter: true,
        role: true,
        vocationalFamily: true,
        createdAt: true,
      },
      orderBy: {
        id: "desc",
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        educationalCenter: true,
        role: true,
        vocationalFamily: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException("Usuario no encontrado.");
    }

    return user;
  }

  async updateRole(id: number, data: UpdateUserRoleDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundException("USUARIO_NO_ENCONTRADO");
    }

    const roleExists = await this.prisma.role.findUnique({
      where: { id: data.roleId },
    });

    if (!roleExists) {
      throw new BadRequestException("ROL_NO_VALIDO");
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        roleId: data.roleId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async remove(id: number) {
    const userExists = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundException("USUARIO_NO_ENCONTRADO");
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return { message: "Usuario eliminado correctamente" };
  }
}
