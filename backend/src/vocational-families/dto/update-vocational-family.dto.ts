import { PartialType } from '@nestjs/mapped-types';
import { CreateVocationalFamilyDto } from './create-vocational-family.dto';

export class UpdateVocationalFamilyDto extends PartialType(CreateVocationalFamilyDto) {}
