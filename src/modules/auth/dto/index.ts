import { ApiProperty } from "@nestjs/swagger";
import { IStatusResponse } from "@constants/index";

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
}

export interface ISignUpResponseDto extends IStatusResponse {
  response: {
    email: string;
    phoneNumber: string;
    username: string;
  };
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

export interface ISignInResponseDto extends IStatusResponse {
  response: {
    email: string;
    phoneNumber: string;
    username: string;
    access_token: string;
  };
}
