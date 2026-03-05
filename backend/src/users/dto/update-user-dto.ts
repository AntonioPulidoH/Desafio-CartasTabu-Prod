import { IsInt, IsNotEmpty, IsEmail, IsOptional, IsString, isString, MinLength } from "class-validator";

export class UpdateUserRoleDto {
  @IsInt()
  @IsNotEmpty()
  roleId: number;
}

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email?: string

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
