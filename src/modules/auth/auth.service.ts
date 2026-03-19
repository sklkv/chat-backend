import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
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

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UsersService
  ) {}

  async singUpUser(userDto: SignUpDto): Promise<ISignUpResponseDto> {
    const { email, username, phoneNumber, password } = userDto;

    const sameCredentialsUsers = await this.userService.findSameCredentialUsers(
      { email, username, phoneNumber }
    );

    if (sameCredentialsUsers.length) {
      throw new BadBaseException("Email, phone number or username in use");
    }

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

  async signInUser(
    userDto: SignInDto
  ): Promise<ISignInResponseDto & { refresh_token: string }> {
    const { email, username, phoneNumber } = userDto;
    const user = await this.userService.findUser({ email, username, phoneNumber });

    if (!user) {
      throw new BadBaseException("Invalid username or email");
    }

    const isMatchUser = await bcrypt.compare(userDto.password, user.password);
    if (!isMatchUser) {
      throw new BadBaseException("Invalid password");
    }

    const jwtPayload: IJwtPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      phoneNumber: user.phoneNumber,
    };

    const access_token = await this.jwtService.signAsync(jwtPayload);
    const refresh_token = await this.jwtService.signAsync(jwtPayload, {
      secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
      expiresIn: this.configService.get<string>("JWT_REFRESH_EXPIRES_IN"),
    });

    return {
      response: {
        email: user.email,
        username: user.username,
        phoneNumber: user.phoneNumber,
        access_token,
      },
      refresh_token,
      status: RESPONSE_STATUS.OK,
    };
  }

  async refreshAccessToken(
    payload: IJwtPayload
  ): Promise<{ access_token: string; status: RESPONSE_STATUS }> {
    const newPayload: IJwtPayload = {
      sub: payload.sub,
      email: payload.email,
      username: payload.username,
      phoneNumber: payload.phoneNumber,
    };
    const access_token = await this.jwtService.signAsync(newPayload);
    return { access_token, status: RESPONSE_STATUS.OK };
  }

  async getUserProfile(dto: IJwtPayload): Promise<IProfileResponseDto> {
    return {
      response: dto as any,
      status: RESPONSE_STATUS.OK,
    };
  }
}
