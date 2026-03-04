import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CardsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCardDto, creatorId: number) {
  return this.prisma.card.create({
    data: {
      keyword:data.keyword,
      themeId:data.themeId,
      creatorId:creatorId,
        forbiddenWords: {
        create: data.forbiddenWords.map(word => ({ word })),
      }
      
    },
  });
}
  findAll() {
    return this.prisma.card.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  async findByTheme(themeId: number) {
    const cards = await this.prisma.card.findMany({
      where: { themeId },
      include: {
        forbiddenWords: true,
      },
    });

    return cards.map(card => ({
      id: String(card.id),
      word: card.keyword,
      tabuWords: card.forbiddenWords.map(fw => fw.word),
    }));
  }

  update(id: number, updateCardDto: UpdateCardDto) {
      return this.prisma.card.update({
    where: { id },
    data: {
      keyword: updateCardDto.keyword,
      themeId: updateCardDto.themeId,
      forbiddenWords: {
        create: updateCardDto.forbiddenWords.map(word => ({ word })),
      }
    }
  });
  }

  remove(id: number) {
    return this.prisma.card.delete({
      where: {id}
    })
  }
}
