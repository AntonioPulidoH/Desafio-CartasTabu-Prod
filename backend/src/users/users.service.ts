import { Injectable, NotFoundException } from "@nestjs/common";
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
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return this.prisma.user.create({
    data: {
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      educationalCenter: data.educationalCenter,
      roleId: 1,
      vocationalFamilyId: data.vocationalFamilyId ?? null,
    },
  });
}
}
