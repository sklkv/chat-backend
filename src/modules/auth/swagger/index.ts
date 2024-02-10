import { ApiProperty } from "@nestjs/swagger";
import { RESPONSE_STATUS } from "@constants/index";

export class SignUpResponse {
  @ApiProperty({
    example: {
      email: "pepe@pepe.com",
      username: "pepe",
    },
    description: "Ответ успешной регистрации пользователя",
  })
  readonly response: {
    email: string;
    username: string;
  };
  @ApiProperty({ example: "OK | FAILED", description: "Статус ответа" })
  readonly status: RESPONSE_STATUS;
}

export class SignInResponse {
  @ApiProperty({
    example: {
      email: "woody@mail.example",
      username: "Woody Woodpecker",
      access_token: "jwt-token",
    },
    description: "Ответ успешной авторизации пользователя",
  })
  readonly response: {
    email: string;
    username: string;
    access_token: string;
  };

  @ApiProperty({ example: "OK | FAILED", description: "Статус ответа" })
  readonly status: RESPONSE_STATUS;
}
