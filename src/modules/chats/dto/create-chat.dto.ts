import { ApiProperty } from "@nestjs/swagger";

export class CreateChatDto {
  @ApiProperty({
    example: [1, 2],
    description: "Список участников",
  })
  participants: number[];
}
