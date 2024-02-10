import { ApiProperty } from "@nestjs/swagger";

export class FindUserDto {
  @ApiProperty({
    example: "example@mail.example",
    description: "Email пользователя",
  })
  readonly email: string;

  @ApiProperty({ example: "string", description: "Mozart" })
  readonly username: string;
}
