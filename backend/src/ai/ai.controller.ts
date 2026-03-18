import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { AiService } from "./ai.service";
import { GenerateCardsDto } from "./dto/generate-cards.dto";
import { GenerateCollectionDto } from "./dto/generate-collection.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("ai")
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post("generate-cards")
  async generateCards(@Body() generateCardsDto: GenerateCardsDto) {
    return this.aiService.generateCards(generateCardsDto);
  }

  @Post("generate-collection")
  async generateCollection(
    @Body() generateCollectionDto: GenerateCollectionDto,
  ) {
    return this.aiService.generateCollection(generateCollectionDto);
  }
}
