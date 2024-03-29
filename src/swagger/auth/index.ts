import { ApiProperty } from "@nestjs/swagger";
import { RESPONSE_STATUS } from "@constants/index";

export class SignUpResponse {
  @ApiProperty({
    example: {
      email: "pepe@pepe.com",
      phoneNumber: "+79297007070",
      username: "pepe",
    },
    description: "Ответ успешной регистрации пользователя",
  })
  readonly response: {
    email: string;
    phoneNumber: string;
    username: string;
  };
  @ApiProperty({ example: "OK", description: "Статус ответа" })
  readonly status: RESPONSE_STATUS;
}

export class SignInResponse {
  @ApiProperty({
    example: {
      email: "woody@mail.example",
      phoneNumber: "+79297007070",
      username: "Woody Woodpecker",
      access_token: "jwt-token",
    },
    description: "Ответ успешной авторизации пользователя",
  })
  readonly response: {
    email: string;
    phoneNumber: string;
    username: string;
    access_token: string;
  };

  @ApiProperty({ example: "OK", description: "Статус ответа" })
  readonly status: RESPONSE_STATUS;
}
