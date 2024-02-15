import * as bcrypt from "bcrypt";
import { BadRequestException, Injectable } from "@nestjs/common";
import { SignUpDto, SignInDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { BadBaseException } from "@exception/bad-base-exception";
import { RESPONSE_STATUS } from "@constants/index";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService
  ) {}

  // TODO: сравнить пароль и подтвержедние пароля, вынести типизацию ответа
  async singUpUser(
    userDto: SignUpDto
  ): Promise<{
    response: {
      email: string;
      phoneNumber: string;
      username: string;
    };
    status: RESPONSE_STATUS;
  }> {
    const { email, username, phoneNumber, password, confirmPassword } = userDto;

    if (password !== confirmPassword) {
      throw new BadBaseException("Incorrect password confirmation");
    }

    const sameCredentialsUsers = await this.userService.findSameCredentialUsers(
      {
        email,
        username,
        phoneNumber,
      }
    );

    if (sameCredentialsUsers.length) {
      throw new BadBaseException("Email, phone number or username in use");
    } else {
      // TODO: добавить соль для лучшей защиты пароля
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.userService.createUser({
        ...userDto,
        password: hashedPassword,
      });

      // TODO: подумать над необходимыми атрибутами
      return {
        response: {
          email: user.email,
          username: user.username,
          phoneNumber: user.phoneNumber,
        },
        status: RESPONSE_STATUS.OK,
      };
    }
  }

  async signInUser(
    userDto: SignInDto
  ): Promise<{
    response: {
      email: string;
      phoneNumber: string;
      username: string;
      access_token: string;
    };
    status: RESPONSE_STATUS;
  }> {
    const { email, username, phoneNumber } = userDto;
    const user = await this.userService.findUser({
      email,
      username,
      phoneNumber,
    });

    if (!user) {
      throw new BadRequestException("Invalid username or email");
    } else {
      const isMatchUser = await bcrypt.compare(userDto.password, user.password);

      if (!isMatchUser) {
        throw new BadBaseException("Invalid password");
      } else {
        const jwtPayload = {
          sub: user.id,
          email,
          phoneNumber,
          username,
        };
        // TODO: подумать над необходимыми атрибутами
        return {
          response: {
            email,
            username,
            phoneNumber,
            access_token: this.jwtService.sign(jwtPayload),
          },
          status: RESPONSE_STATUS.OK,
        };
      }
    }
  }
}
