import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { WebsocketsModule } from 'src/websockets/websocket.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'secretKey',
    }),
    WebsocketsModule
  ],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}