import { ApiProperty } from "@nestjs/swagger";

export class CreateMessageDto {
  @ApiProperty({
    example: "89rct5ac2-8493-49b0-95d8-de843d90e6ca",
    description: "Уникальный идентификатор чата",
  })
  chat_id: string;

  @ApiProperty({
    example: "89rct5ac2-8493-49b0-95d8-de843d90e6ca",
    description: "Уникальное идентификатор пользователя",
  })
  user_id: string;

  @ApiProperty({ example: "text", description: "Тип сообщения" })
  type: string;

  @ApiProperty({ example: "string", description: "Текст сообщения" })
  text: string;
}
