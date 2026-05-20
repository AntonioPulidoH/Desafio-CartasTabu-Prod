import { IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserRoleDto {
  @IsInt()
  @IsNotEmpty()
  roleId: number;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    username?: string

    @IsOptional()
    @IsString()
    educationalCenter?: string

    @IsOptional()
    vocationalFamilyId?: number

    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string
}
