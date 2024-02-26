import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { IJwtPayload } from "@constants/index";
// import { ConfigService } from "@nestjs/config";

// TODO: рефакторинг с использованием ConfigService
@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  // constructor(configService: ConfigService) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "secret",
      // secretOrKey: configService.get<string>("jwt_secret"),
    });
  }

  async validate(payload: IJwtPayload) {
    // создаем user key с той формой объекта из запроса, который есть в защищенном роуте
    return {
      id: payload.sub,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
      username: payload.username,
    };
  }
}
