import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

@Schema()
export class User {
  @Prop()
  email: string

  @Prop()
  password: string

  @Prop()
  isActive: boolean
}

export type UserDocument = HydratedDocument<User>
export const UserSchema = SchemaFactory.createForClass(User)
