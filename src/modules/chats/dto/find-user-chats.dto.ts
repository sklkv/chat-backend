import { ApiProperty } from "@nestjs/swagger";

export class FindUserChatsDto {
  @ApiProperty({
    example: "89rct5ac2-8493-49b0-95d8-de843d90e6ca",
    description: "Уникальный идентификатор участника",
  })
  participant_id: string;
}
