import { ApiProperty } from "@nestjs/swagger";

export class GetMessagesDto {
  @ApiProperty({
    example: "89rct5ac2-8493-49b0-95d8-de843d90e6ca",
    description: "Уникальный идентификатор чата",
  })
  chat_id: string;

  @ApiProperty({
    example: "50",
    description: "Стартовый значение диапазона",
  })
  from: number;

  @ApiProperty({
    example: "99",
    description: "Конечное значение диапазона",
  })
  to: number;
}
