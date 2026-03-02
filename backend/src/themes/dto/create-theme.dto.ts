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

  // Para probar el CRUD por ahora
  // Cuando tengamos validación JWT, creatorId no vendrá del frontend,
  // sino que lo sacaremos del Token (JWT) del usuario logueado
  // SÓLO HAY QUE BORRAR
  @IsInt()
  @IsNotEmpty({ message: "El ID del creador es obligatorio" })
  creatorId: number;
}
