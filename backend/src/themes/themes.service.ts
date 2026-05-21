import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

    async findAll(userId?: number) {
      return this.prisma.theme.findMany({
        where: userId
          ? {
              OR: [
                { creatorId: userId },       
                { isPublic: true },       
              ],
            }
          : { isPublic: true },            
        include: {
          vocationalFamily: { select: { id: true, name: true } },
          creator: { select: { id: true, name: true, lastName: true } },
          _count: { select: { cards: true } },
        },
        orderBy: { createdAt: 'desc' },
      });
    }

  async toggleVisibility(id: number, userId: number) {
    const theme = await this.prisma.theme.findUnique({ where: { id } });

    if (!theme) throw new NotFoundException(`Temática ${id} no existe`);
    if (theme.creatorId !== userId)
      throw new ForbiddenException('No puedes modificar esta colección');

    const updatedTheme = await this.prisma.theme.update({
      where: { id },
      data: { isPublic: !theme.isPublic },
    });
    this.wsGateway.notifyThemeUpdated(updatedTheme);

    return updatedTheme;
  }

  async findOne(id: number) {
    const theme = await this.prisma.theme.findUnique({
      where: { id },
      include: {
        vocationalFamily: true,
        creator: true,
        cards: {
          include: {
            forbiddenWords: true  
          }
        }
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

    async countByUser(userId: number) {
    const total = await this.prisma.theme.count({
      where: {
        creatorId: userId
      }
    })

    return {total}
  }
}
