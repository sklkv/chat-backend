import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt } from "class-validator";

export class CreateChatDto {
  @ApiProperty({
    example: [1, 2],
    description: "Список участников",
  })
  @IsArray()
  @IsInt({ each: true })
  participants: number[];
}
