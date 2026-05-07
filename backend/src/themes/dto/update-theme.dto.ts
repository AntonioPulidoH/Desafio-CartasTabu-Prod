import { PartialType } from '@nestjs/mapped-types';
import { CreateThemeDto } from './create-theme.dto';
import { IsString } from 'class-validator';
import { IsOptional } from 'class-validator';
export class UpdateThemeDto extends PartialType(CreateThemeDto) {
  name?: string;
  description?: string;
  vocationalFamilyId?: number;
  isPublic?: boolean; 
    @IsOptional()
    @IsString()
    backImageUrl?: string;
}
