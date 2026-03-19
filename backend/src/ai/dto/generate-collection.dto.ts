import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class GenerateCollectionDto {
  @IsNotEmpty()
  @IsString()
  vocationalFamily: string; 

  @IsOptional()
  @IsString()
  topic?: string; 

  @IsInt()
  @Min(1)
  @Max(10) 
  amount: number;

  @IsOptional()
  @IsString()
  context?: string;
}