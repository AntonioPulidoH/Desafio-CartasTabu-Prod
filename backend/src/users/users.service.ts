import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/user-create.dto";
import { CreateRegisterCodeDto } from "./dto/create-register-code.dto";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcryptjs";
import { randomUUID } from 'crypto';
import { UpdateUserDto, UpdateUserRoleDto } from "./dto/update-user-dto";

type RegisterCodeRecord = {
  id: number;
  code: string;
  roleId: number;
  expiresAt: Date;
  used: boolean;
};

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService, private jwtService: JwtService) {}

  async create(data: CreateUserDto) {

    const isValidPassword = (password: string): boolean => {
      const passwordVerified = /^(?=.*[A-Z])(?=.*\d).{8,}$/
      return passwordVerified.test(password)
    }

    const registerCode = await (this.prisma as any).registerCode.findUnique({
      where: { code: data.registerCode }
    })

    if(!registerCode) {
      throw new BadRequestException("CODIGO_INVALIDO")
    }

    if (!data.password || !isValidPassword(data.password)) {
      throw new BadRequestException("PASSWORD_INVALIDA");
    }

    if(!data.username || data.username.length < 3) {
      throw new BadRequestException('USERNAME_INVALIDO')
    }

    if (!data.name || !data.lastName) {
      throw new BadRequestException("DATOS_OBLIGATORIOS");
    }

    const userExists = await this.findUsername(data.username);

    if (userExists) {
      throw new ConflictException("USERNAME_YA_REGISTRADO");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const prismaAny = this.prisma as any;

    return prismaAny.$transaction(async (tx: any) => {
      const rc = await tx.registerCode.findUnique({ where: { code: data.registerCode } });
      if (!rc) throw new BadRequestException("CODIGO_INVALIDO");
      if (rc.used) throw new BadRequestException("CODIGO_USADO");
      if (rc.expiresAt < new Date()) throw new BadRequestException("CODIGO_EXPIRADO");

      const user = await tx.user.create({
        data: {
          name: data.name,
          lastName: data.lastName,
          username: data.username,
          registerCodeId: rc.id,
          password: hashedPassword,
          educationalCenter: data.educationalCenter ?? null,
          roleId: rc.roleId ?? 3,
          vocationalFamilyId: data.vocationalFamilyId ?? null,
        },
      });

      await tx.registerCode.update({ where: { id: rc.id }, data: { used: true } });
      return user;
    });
  }

  async createRegisterCode(data: CreateRegisterCodeDto) {
    const roleExists = await this.prisma.role.findUnique({
      where: { id: data.roleId },
    });

    if (!roleExists) {
      throw new BadRequestException("ROL_NO_VALIDO");
    }

    const code = data.code?.trim() || `RC-${randomUUID().slice(0, 8).toUpperCase()}`;
    const expiresAt = data.expiresAt
      ? new Date(data.expiresAt)
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    if (Number.isNaN(expiresAt.getTime())) {
      throw new BadRequestException("FECHA_INVALIDA");
    }

    const existingCode = await (this.prisma as any).registerCode.findUnique({
      where: { code },
    });

    if (existingCode) {
      throw new ConflictException("CODIGO_YA_EXISTE");
    }

    return (this.prisma as any).registerCode.create({
      data: {
        code,
        roleId: data.roleId,
        expiresAt,
        used: false,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        lastName: true,
        username: true,
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
        username: true,
        educationalCenter: true,
        role: true,
        vocationalFamily: true,
        level: true,
        xp: true,
        rank: true,
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
        username: true,
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

  async updateMe(userId: number, data: UpdateUserDto) {
    const updateData: any = {
      username: data.username,
      educationalCenter: data.educationalCenter,
      vocationalFamilyId: data.vocationalFamilyId
    }

    if(data.password) {
      const hassedPassword = await bcrypt.hash(data.password, 10)
      updateData.password = hassedPassword
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        lastName: true,
        username: true,
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

  async findUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
      include: { role: true }
    })
  }

  async getRoles() {
    return this.prisma.role.findMany({
      select: { id: true, name: true }
    });
  }
}
