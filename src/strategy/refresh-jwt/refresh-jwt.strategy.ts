import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
import { Request } from "express";

// TODO: рефакторинг с использованием ConfigService
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh"
) {
  // constructor(configService: ConfigService) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: "secret",
      // secretOrKey: configService.get<string>('refresh_secret'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const refreshToken = req.cookies.refresh;
    return { ...payload, refreshToken };
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && "refresh_token" in req.cookies) {
      return req.cookies.refresh_token;
    }
    return null;
  }
}
