import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "@modules/auth/auth.module";
import { UsersModule } from "@modules/users/users.module";
// import { EventsModule } from "./ws/events.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [],
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    // EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
