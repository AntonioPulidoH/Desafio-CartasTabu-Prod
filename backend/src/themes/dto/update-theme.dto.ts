import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateThemeDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    vocationalFamilyId?: number;
}