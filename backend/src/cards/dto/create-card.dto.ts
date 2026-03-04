import { ForbiddenWord } from "@prisma/client";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateCardDto {
    @IsNotEmpty()
    @IsString()
    keyword:string;

    @IsNotEmpty()
    themeId:number;

    @IsNotEmpty()
    creatorId:number;

    @IsNotEmpty()
    @IsArray()
    forbiddenWords:string[]
}
