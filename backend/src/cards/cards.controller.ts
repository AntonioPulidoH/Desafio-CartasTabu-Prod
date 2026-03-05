import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Req } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createCardDto: CreateCardDto, @Req() req) {
      return this.cardsService.create(createCardDto, req.user.userId);
    }

  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @Get('themes/:themeId')
    findByTheme(@Param('themeId') themeId: string) {
      return this.cardsService.findByTheme(Number(themeId));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(+id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(+id);
  }


}
