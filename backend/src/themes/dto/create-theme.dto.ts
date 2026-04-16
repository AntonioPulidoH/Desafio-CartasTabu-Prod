import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  MinLength,
} from "class-validator";

export class CreateThemeDto {
  @IsString()
  @IsNotEmpty({ message: "El nombre de la temática es obligatorio" })
  @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsNotEmpty({ message: "La familia profesional es obligatoria" })
  vocationalFamilyId: number;

  @IsInt()
  @IsNotEmpty({ message: "El ID del creador es obligatorio" })
  creatorId: number;

  isPublic?: boolean;
}
