import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JWTStrategy } from "@strategy/jwt/jwt.strategy";
import { UsersModule } from "@modules/users/users.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

// TODO: рефакторинг с применением ConfigService
@Module({
  providers: [AuthService, JWTStrategy],
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: "secret",
      signOptions: { expiresIn: "4h" },
    }),
    UsersModule,
  ],
})
export class AuthModule {}
