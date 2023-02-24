import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from '../Controller'
import AppConfig from '../../config/app.config'
import { UserModule } from './UserModule'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
      load: [AppConfig]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI')
      }),
      inject: [ConfigService]
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
