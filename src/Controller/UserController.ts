import { Controller, Get } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from '../Entity'
import { Model } from 'mongoose'

@Controller('User')
export class UserController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  @Get('createUser')
  async createUser() {
    return this.userModel.find()
  }
}
