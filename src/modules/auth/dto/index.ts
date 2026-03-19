import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";
import { IStatusResponse } from "@constants/index";

export class SignUpDto {
  @ApiProperty({
    example: "example@mail.example",
    description: "Email пользователя",
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: "+79297007070", description: "Телефон пользователя" })
  @IsString()
  readonly phoneNumber: string;

  @ApiProperty({ example: "Fatty Boom Boom", description: "Имя пользователя" })
  @IsString()
  @MinLength(2)
  readonly username: string;

  @ApiProperty({ example: "alligator7", description: "Пароль пользователя" })
  @IsString()
  @MinLength(6)
  readonly password: string;
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
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: "+79297007070", description: "Телефон пользователя" })
  @IsString()
  readonly phoneNumber: string;

  @ApiProperty({ example: "Johny", description: "Имя пользователя" })
  @IsString()
  readonly username: string;

  @ApiProperty({ example: "Alligator7", description: "Пароль пользователя" })
  @IsString()
  @MinLength(6)
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

export interface IProfileResponseDto extends ISignUpResponseDto {}
