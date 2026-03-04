import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createThemeDto: CreateThemeDto, @Request() req) {
     console.log('req.user:', req.user);
    return this.themesService.create(createThemeDto, req.user.sub);
  }

  @Get()
  findAll() {
    return this.themesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.themesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateThemeDto: UpdateThemeDto) {
    return this.themesService.update(+id, updateThemeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.themesService.remove(+id);
  }
}
