import { InputType, Field } from "type-graphql"
import { User } from "./user.entity"
import { MinLength } from "class-validator"

@InputType()
export class UpdateInput implements Partial<User> {
  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  lastName?: string

  @MinLength(5)
  @Field({ nullable: true })
  email?: string

  @MinLength(8)
  @Field({ nullable: true })
  password?: string

  @Field({ nullable: true })
  avatarKey?: string
}

@InputType()
export class RegisterInput implements Partial<User> {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @MinLength(5)
  @Field()
  email: string

  @MinLength(8)
  @Field()
  password: string
}

@InputType()
export class LoginInput implements Partial<User> {
  @Field()
  email: string

  @Field()
  password: string
}
