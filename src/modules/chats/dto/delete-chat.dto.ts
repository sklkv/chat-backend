import { ApiProperty } from "@nestjs/swagger";

export class DeleteChatDto {
  @ApiProperty({
    example:
      "[89rct5ac2-8493-49b0-95d8-de843d90e6ca, 90rct5ac2-8493-49b0-95d8-de843d90e6ca]",
    description: "Список участников",
  })
  chatId: string;
}
