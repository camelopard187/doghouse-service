import { VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from '~/app.module'
import { version } from '~/../package.json'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableVersioning({ type: VersioningType.URI }).enableCors()

  const config = new DocumentBuilder()
    .setTitle('Doghouse API')
    .setDescription(
      `This API provides endpoints for managing a doghouse application.
      It allows users to perform various operations related to dogs`
    )
    .setVersion(version)
    .addTag('dog')
    .addTag('ping')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}

bootstrap()
