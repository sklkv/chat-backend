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

  // TODO: сравнить пароль и подтвержедние пароля
  async singUpUser(
    userDto: SignUpDto
  ): Promise<{
    response: {
      email: string;
      username: string;
    };
    status: RESPONSE_STATUS;
  }> {
    const { email, username } = userDto;

    const sameCredentialsUsers = await this.userService.findSameCredentialUsers(
      {
        email,
        username,
      }
    );

    if (sameCredentialsUsers.length) {
      throw new BadBaseException("Email or username in use");
    } else {
      // add password salt for better security
      const hashedPassword = await bcrypt.hash(userDto.password, 10);

      const user = await this.userService.createUser({
        ...userDto,
        password: hashedPassword,
      });

      // TODO: подумать над необходимыми атрибутами
      return {
        response: {
          email: user.email,
          username: user.username,
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
      username: string;
      access_token: string;
    };
    status: RESPONSE_STATUS;
  }> {
    const { email, username } = userDto;
    const user = await this.userService.findUser({
      email,
      username,
    });

    if (!user) {
      throw new BadRequestException("Invalid username or email");
    } else {
      const isMatchUser = await bcrypt.compare(userDto.password, user.password);

      if (!isMatchUser) {
        throw new BadBaseException("Invalid password");
      } else {
        const jwtPayload = {
          email,
          sub: user.id,
          username,
        };
        // TODO: подумать над необходимыми атрибутами
        return {
          response: {
            email: user.email,
            username: user.username,
            access_token: this.jwtService.sign(jwtPayload),
          },
          status: RESPONSE_STATUS.OK,
        };
      }
    }
  }
}
