import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'
import { AppModule } from './Module'
import compress from '@fastify/compress'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )
  await app.register(compress)
  app.setGlobalPrefix('Engine.svc')
  await app.listen(3000)
}

bootstrap()
