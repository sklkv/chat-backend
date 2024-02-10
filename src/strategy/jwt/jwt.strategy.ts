import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
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

  // TODO: добавить тип что именно хранится в jwt-токене
  async validate(payload: any) {
    // создаем user key с той формой объекта из запроса, который есть в защищенном роуте
    return {
      id: payload.sub,
      username: payload.username,
      email: payload.email,
    };
  }
}
