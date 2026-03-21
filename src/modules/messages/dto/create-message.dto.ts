import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsUUID } from "class-validator";

export class CreateMessageDto {
  @ApiProperty({
    example: "89rct5ac2-8493-49b0-95d8-de843d90e6ca",
    description: "Уникальный идентификатор чата",
  })
  @IsUUID()
  chat_id: string;

  @ApiProperty({
    example: 1,
    description: "Уникальное идентификатор пользователя",
  })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: "text", description: "Тип сообщения" })
  @IsString()
  type: string;

  @ApiProperty({ example: "string", description: "Текст сообщения" })
  @IsString()
  text: string;
}
