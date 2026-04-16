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
@UseGuards(JwtAuthGuard)
findAll(@Request() req) {
  return this.themesService.findAll(req.user.userId);
}

@Get('public')
findAllPublic() {
  return this.themesService.findAll();
}

@Patch(':id/visibility')
@UseGuards(JwtAuthGuard)
toggleVisibility(
  @Param('id', ParseIntPipe) id: number,
  @Request() req,
) {
  return this.themesService.toggleVisibility(id, req.user.userId);
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

  @Get('my/count')
  @UseGuards(JwtAuthGuard)
  countMyThemes(@Request() req){
    return this.themesService.countByUser(req.user.userId)
  }
}
