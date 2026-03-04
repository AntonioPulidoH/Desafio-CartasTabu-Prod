import { Injectable } from '@nestjs/common';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FamiliesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createFamilyDto: CreateFamilyDto) {
    return 'This action adds a new family';
  }

  findAll() {
    return this.prisma.vocationalFamily.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} family`;
  }

  update(id: number, updateFamilyDto: UpdateFamilyDto) {
    return `This action updates a #${id} family`;
  }

  remove(id: number) {
    return `This action removes a #${id} family`;
  }
}
