import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IJwtPayload } from "@constants/index";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET"),
    });
  }

  async validate(payload: IJwtPayload) {
    return {
      id: payload.sub,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
      username: payload.username,
    };
  }
}
