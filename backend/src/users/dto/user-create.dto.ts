import { IsEmail, IsNotEmpty, IsOptional, MinLength, IsInt } from 'class-validator';


export class CreateUserDto {
 
  @IsNotEmpty()
  name: string;


  @IsNotEmpty()
  lastName: string;

 
  @IsEmail()
  email: string;


  @MinLength(6)
  password: string;


  @IsOptional()
  educationalCenter?: string;

 
  @IsInt()
  roleId: number;

  
  @IsOptional()
  vocationalFamilyId?: number;
}