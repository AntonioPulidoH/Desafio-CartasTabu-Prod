import { IsInt, IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateRegisterCodeDto {
  @IsInt()
  @IsNotEmpty()
  roleId: number;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}
