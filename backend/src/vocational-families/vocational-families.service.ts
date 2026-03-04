import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class VocationalFamiliesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.vocationalFamily.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }
}
