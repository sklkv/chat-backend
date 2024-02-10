import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IUserCreationAttributes {
  email: string;
  password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, IUserCreationAttributes> {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "example@mail.com",
    description: "Email пользователя",
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: "@username", description: "Уникальное имя" })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  username: string;

  @ApiProperty({ example: "string", description: "Пароль пользователя" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: "Узбекистан", description: "Страна пользователя" })
  @Column({ type: DataType.STRING, allowNull: true })
  country: string;

  @ApiProperty({
    example: "true",
    description: "Согласие пользователя получать новости",
  })
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  agreedToRecieveNews: boolean;

  @ApiProperty({
    example: "true",
    description: "Согласие пользователя на обработку персональных данных",
  })
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  consentedDataProcessing: boolean;
}
