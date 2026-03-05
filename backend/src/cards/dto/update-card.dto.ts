import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './create-card.dto';
import { IsArray, IsNotEmpty, IsString} from 'class-validator';

export class UpdateCardDto extends PartialType(CreateCardDto) {
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
