import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto {
  @ApiProperty({
    example: "example@mail.example",
    description: "Email пользователя",
  })
  readonly email: string;

  @ApiProperty({ example: "+79297007070", description: "Телефон пользователя" })
  readonly phoneNumber: string;

  @ApiProperty({ example: "Fatty Boom Boom", description: "Имя пользователяя" })
  readonly username: string;

  @ApiProperty({ example: "alligator7", description: "Пароль пользователя" })
  readonly password: string;

  @ApiProperty({ example: "alligator7", description: "Пароль пользователя" })
  readonly confirmPassword: string;

  // @ApiProperty({
  //   example: "true",
  //   description: "Согласие пользователя на обработку персональных данных",
  // })
  // readonly consentedDataProcessing: boolean;
}

export class SignInDto {
  @ApiProperty({
    example: "example@mail.example",
    description: "Email пользователя",
  })
  readonly email: string;

  @ApiProperty({ example: "+79297007070", description: "Телефон пользователя" })
  readonly phoneNumber: string;

  @ApiProperty({ example: "Johny", description: "Имя пользователяя" })
  readonly username: string;

  @ApiProperty({ example: "Alligator7", description: "Пароль пользователя" })
  readonly password: string;
}
