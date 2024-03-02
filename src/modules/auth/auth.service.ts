import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { BadBaseException } from "@exception/bad-base-exception";
import { RESPONSE_STATUS, IJwtPayload } from "@constants/index";
import {
  SignUpDto,
  SignInDto,
  ISignUpResponseDto,
  ISignInResponseDto,
  IProfileResponseDto,
} from "./dto";
import { UsersService } from "../users/users.service";

// TODO: завернуть ответы в утилиту
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService
  ) {}

  async singUpUser(userDto: SignUpDto): Promise<ISignUpResponseDto> {
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

  // TODO: refresh access-token cookie
  async signInUser(userDto: SignInDto): Promise<ISignInResponseDto> {
    const { email, username, phoneNumber } = userDto;
    const user = await this.userService.findUser({
      email,
      username,
      phoneNumber,
    });
    // TODO: удалить, задержка ради спиннера
    await new Promise((res) => {
      setTimeout(res, 1500);
    });
    if (!user) {
      throw new BadBaseException("Invalid username or email");
    } else {
      const isMatchUser = await bcrypt.compare(userDto.password, user.password);

      if (!isMatchUser) {
        throw new BadBaseException("Invalid password");
      } else {
        const jwtPayload: IJwtPayload = {
          sub: user.id,
          email: user.email,
          username: user.username,
          phoneNumber: user.phoneNumber,
        };

        const token = await this.jwtService.signAsync(jwtPayload);

        return {
          response: {
            email: user.email,
            username: user.username,
            phoneNumber: user.phoneNumber,
            access_token: token,
          },
          status: RESPONSE_STATUS.OK,
        };
      }
    }
  }

  async getUserProfile(dto: SignInDto): Promise<IProfileResponseDto> {
    return {
      response: dto,
      status: RESPONSE_STATUS.OK,
    };
  }
}
