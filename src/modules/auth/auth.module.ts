import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JWTStrategy } from "@strategy/jwt/jwt.strategy";
import { RefreshTokenStrategy } from "@strategy/refresh-jwt/refresh-jwt.strategy";
import { UsersModule } from "@modules/users/users.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
  providers: [AuthService, JWTStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: configService.get<string>("JWT_EXPIRES_IN") },
      }),
    }),
    UsersModule,
  ],
})
export class AuthModule {}
