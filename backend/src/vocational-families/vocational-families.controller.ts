import { Controller, Get } from "@nestjs/common";
import { VocationalFamiliesService } from "./vocational-families.service";

@Controller("vocational-families")
export class VocationalFamiliesController {
  constructor(
    private readonly vocationalFamiliesService: VocationalFamiliesService,
  ) {}

  @Get()
  findAll() {
    return this.vocationalFamiliesService.findAll();
  }
}
