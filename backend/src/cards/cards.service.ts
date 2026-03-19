import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { WebsocketsGateway } from 'src/websockets/websocket.gateaway';

@Injectable()
export class CardsService {
  constructor(private readonly prisma: PrismaService, private readonly wsGateway: WebsocketsGateway) {}

  async create(data: CreateCardDto, creatorId: number) {
    this.wsGateway.notifyCardCreated(data);
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
      forbiddenWords: card.forbiddenWords.map(fw => fw.word),
    }));
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    this.wsGateway.notifyCardUpdated(updateCardDto);
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
    this.wsGateway.notifyCardDeleted();
    return this.prisma.card.delete({
      where: {id}
    })
  }

  async countByUser(userId: number) {
    const total = await this.prisma.card.count({
      where: {
        creatorId: userId
      }
    })

    return {total}
  }
}
