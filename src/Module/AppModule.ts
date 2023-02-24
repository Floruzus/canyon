import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from '../Controller'
import AppConfig from '../../config/app.config'
import { UserModule } from './UserModule'
import { MongooseModule } from '@nestjs/mongoose'
import { ParameterService } from '../Service'
import { User, UserSchema } from '../Entity'

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
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule
  ],
  controllers: [AppController],
  providers: [ParameterService]
})
export class AppModule {}
