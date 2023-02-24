import { Module } from '@nestjs/common'
import { User, UserSchema } from '../Entity'
import { UserController } from '../Controller'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: []
})
export class UserModule {}
