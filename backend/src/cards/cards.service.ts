import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { WebsocketsGateway } from 'src/websockets/websocket.gateaway';

@Injectable()
export class CardsService {
  constructor(private readonly prisma: PrismaService, private readonly wsGateway: WebsocketsGateway) {}

  async create(data: CreateCardDto, creatorId: number) {
    const card = await this.prisma.card.create({
      data: {
        keyword:data.keyword,
        themeId:data.themeId,
        creatorId:creatorId,
          forbiddenWords: {
          create: data.forbiddenWords.map(word => ({ word })),
          }
        },
    });

    //obtenemos el usuario para subir 1xp por crear la carta
    const user = await this.prisma.user.findUnique({
      where: {id: creatorId}
    })

    if(!user) return card

    let newXp = user.xp + 1
    let newLevel = user.level

    //subida de nivel si hay suficiente xp y se resta la xp utilizada para la subida
    while(newXp >= newLevel * 10) {
      newXp -= newLevel * 10
      newLevel++
    }

    //cálculo de rango
    const newRank = this.getRank(newLevel)

    //actualización de user
    await this.prisma.user.update({
      where: {id: creatorId},
      data: {
        xp: newXp,
        level: newLevel,
        rank: newRank
      }
    })
    
    this.wsGateway.notifyCardCreated(data);

    return card
  }

  private getRank(level: number) {
    if(level >= 50) return 'Maestro de Desbloquéalo'
    if(level >= 30) return 'Gran Maestro'
    if(level >= 20) return 'Maestro'
    if(level >= 16) return 'Experto'
    if(level >= 10) return 'Estratega'
    if(level >= 7) return 'Pensador'
    if(level >= 4) return 'Estudiante'
    return 'Aprendiz'
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
