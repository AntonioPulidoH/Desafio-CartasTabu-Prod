import { Injectable } from '@nestjs/common';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ThemesService {
  constructor(private readonly prisma:PrismaService){}
  async create(data: CreateThemeDto, creatorId: number) {
    return this.prisma.theme.create({
      data:{
        name:data.name,
        description:data.description,
        vocationalFamilyId:data.vocationalFamilyId,
        creatorId:creatorId
      }

    })
  }

  findAll() {
    return this.prisma.theme.findMany({
      include: {
        vocationalFamily: true, 
      },
    });
  }

  findOne(id: number) {
      return this.prisma.theme.findUnique({
        where: { id },
      });
  }

update(id: number, updateThemeDto: UpdateThemeDto) {
  return this.prisma.theme.update({
    where: { id },
    data: {
      name: updateThemeDto.name,
      description: updateThemeDto.description,
      vocationalFamilyId: updateThemeDto.vocationalFamilyId,
    }
  });
}

  remove(id: number) {
    return this.prisma.theme.delete({
      where: { id },
    });
  }
}
