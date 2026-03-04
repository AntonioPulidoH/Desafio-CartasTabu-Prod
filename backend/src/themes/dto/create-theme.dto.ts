import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateThemeDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsString()
    description:string;

    @IsNumber()
    vocationalFamilyId:number;

}
