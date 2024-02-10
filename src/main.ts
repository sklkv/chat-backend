import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "@exception/http-exception.filter";

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Chat Backend Swagger")
    .setDescription("Документация REST API")
    .setVersion("1.0.0")
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("/swagger", app, swaggerDocument);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser());

  await app.listen(PORT, () => {
    console.info(`App listen ${PORT}`);
  });
}
bootstrap();
