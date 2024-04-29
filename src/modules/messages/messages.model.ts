import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IMessageCreationAttributes {
  id: string;
  chat_id: string;
  user_id: string;
  type: string;
  text: string;
}

@Table({ tableName: "messages" })
export class Messages extends Model<Messages, IMessageCreationAttributes> {
  @ApiProperty({
    example: "89rct5ac2-8493-49b0-95d8-de843d90e6ca",
    description: "Уникальный идентификатор сообщения",
  })
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @ApiProperty({
    example: "89rct5ac2-8493-49b0-95d8-de843d90e6ca",
    description: "Уникальный идентификатор чата",
  })
  @Column({
    type: DataType.UUID,
    unique: false,
    allowNull: false,
  })
  chat_id: string;

  @ApiProperty({
    example: "89rct5ac2-8493-49b0-95d8-de843d90e6ca",
    description: "Уникальное идентификатор пользователя",
  })
  @Column({
    type: DataType.UUID,
    unique: false,
    allowNull: false,
  })
  user_id: string;

  @ApiProperty({ example: "text", description: "Тип сообщения" })
  @Column({ type: DataType.STRING, allowNull: false })
  type: string;

  @ApiProperty({ example: "string", description: "Текст сообщения" })
  @Column({ type: DataType.STRING, allowNull: false })
  text: string;
}
