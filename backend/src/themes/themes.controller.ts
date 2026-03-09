// Ruta: src/themes/themes.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Request,
  UseGuards
} from "@nestjs/common";
import { ThemesService } from "./themes.service";
import { CreateThemeDto } from "./dto/create-theme.dto";
import { UpdateThemeDto } from "./dto/update-theme.dto";
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller("themes")
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createThemeDto: CreateThemeDto, @Request() req) {
     console.log('req.user:', req.user);
    return this.themesService.create(createThemeDto, req.user.userId);
  }

  @Get(':id/public')
  findPublic(@Param('id') id: string) {
    return this.themesService.findOne(+id);  
  }

  @Get()
  findAll() {
    return this.themesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.themesService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateThemeDto: UpdateThemeDto,
  ) {
    return this.themesService.update(id, updateThemeDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.themesService.remove(id);
  }
}
