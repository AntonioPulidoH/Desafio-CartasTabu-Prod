import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { WebsocketsGateway } from 'src/websockets/websocket.gateaway';



@Injectable()
export class ThemesService {
  constructor(private readonly prisma: PrismaService, private readonly wsGateway: WebsocketsGateway) {}

async create(data: CreateThemeDto, creatorId: number) {
  this.wsGateway.notifyThemeCreated(data);
    return this.prisma.theme.create({
      data:{
        name:data.name,
        description:data.description,
        vocationalFamilyId:data.vocationalFamilyId,
        creatorId:creatorId
      }

    })
  }

  async findAll() {
    return this.prisma.theme.findMany({
      include: {
        vocationalFamily: {
          select: { id: true, name: true },
        },
        creator: {
          select: { id: true, name: true, lastName: true },
        },
        _count: {
          select: { cards: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findOne(id: number) {
    const theme = await this.prisma.theme.findUnique({
      where: { id },
      include: {
        vocationalFamily: true,
        creator: true,
        cards: true,
      },
    });

    if (!theme) {
      throw new NotFoundException(`La temática con ID ${id} no existe`);
    }
    return theme;
  }

  async update(id: number, updateThemeDto: UpdateThemeDto) {
    await this.findOne(id);
    this.wsGateway.notifyThemeUpdated(updateThemeDto);
    return this.prisma.theme.update({
      where: { id },
      data: updateThemeDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    this.wsGateway.notifyThemeDeleted();
    return this.prisma.theme.delete({
      where: { id },
    });
  }
}
