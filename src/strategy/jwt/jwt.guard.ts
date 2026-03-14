import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// TODO: look at JwtAuthGuard extending
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {}
