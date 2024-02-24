import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import { setupSwaggerModule } from "@swagger/setup";
import { HttpExceptionFilter } from "@exception/http-exception.filter";

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  setupSwaggerModule(app);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser());

  await app.listen(PORT, () => {
    console.info(`App listen ${PORT}`);
  });
}
bootstrap();
