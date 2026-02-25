import { IsInt, IsNotEmpty } from "class-validator";

export class UpdateUserRoleDto {
  @IsInt()
  @IsNotEmpty()
  roleId: number;
}
