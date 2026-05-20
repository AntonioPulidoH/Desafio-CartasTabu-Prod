
import { IsNotEmpty, IsOptional, MinLength, IsInt } from 'class-validator';


export class CreateUserDto {
 
  @IsNotEmpty()
  name: string;


  @IsNotEmpty()
  lastName: string;

 
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  registerCode: string;


  @MinLength(6)
  password: string;


  @IsOptional()
  educationalCenter?: string;

 
  @IsInt()
  roleId: number;

  
  @IsOptional()
  vocationalFamilyId?: number;
}