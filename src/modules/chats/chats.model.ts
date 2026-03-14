import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IChatCreationAttributes {
  id: string;
  chat_id: string;
  user_id: string;
  type: string;
  text: string;
}

@Table({ tableName: "chats" })
export class Chats extends Model<Chats, IChatCreationAttributes> {
  @ApiProperty({
    example: "89rct5ac2-8493-49b0-95d8-de843d90e6ca",
    description: "Уникальный идентификатор чата",
  })
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @ApiProperty({
    example:
      "[89rct5ac2-8493-49b0-95d8-de843d90e6ca, 90rct5ac2-8493-49b0-95d8-de843d90e6ca]",
    description: "Список участников",
  })
  @Column({
    type: DataType.ARRAY(DataType.UUID),
    unique: false,
    allowNull: false,
  })
  participants: number[];
}
