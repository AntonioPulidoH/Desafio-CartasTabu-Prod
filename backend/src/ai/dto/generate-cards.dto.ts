import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

export class GenerateCardsDto {
  @IsNotEmpty()
  @IsString()
  vocationalFamily: string;

  @IsInt()
  @Min(1)
  @Max(10)
  amount: number;

  @IsOptional()
  @IsString()
  context?: string;
}
