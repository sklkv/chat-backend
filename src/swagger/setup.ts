import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const swaggerConfig = new DocumentBuilder()
  .setTitle("Chat Backend Swagger")
  .setDescription("Документация REST API")
  .setVersion("1.0.0")
  .build();

export const setupSwaggerModule = (app: NestExpressApplication) => {
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("/swagger", app, swaggerDocument);
};
