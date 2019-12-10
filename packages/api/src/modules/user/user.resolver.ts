import { Resolver, Query, Mutation, Arg, Authorized } from "type-graphql"

import { User } from "./user.entity"
import { UserService } from "./user.service"
import { LoginInput, RegisterInput, UpdateInput } from "./user.input"
import { createToken } from "../../lib/jwt"
import { UserAuthResponse } from "./user.response"
import { CurrentUser } from "../shared/context/currentUser"

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // ME
  @Authorized()
  @Query(() => User, { nullable: true })
  async me(@CurrentUser() user: User): Promise<User> {
    return user
  }

  // REGISTER
  @Mutation(() => UserAuthResponse)
  async register(@Arg("data") data: RegisterInput): Promise<UserAuthResponse> {
    const user = await this.userService.create(data)
    const token = await createToken(user.id)
    return { user, token }
  }

  // LOGIN
  @Mutation(() => UserAuthResponse)
  async login(@Arg("data") data: LoginInput): Promise<UserAuthResponse> {
    const user = await this.userService.login(data)
    const token = await createToken(user.id)
    return { user, token }
  }

  // UPDATE USER
  @Authorized()
  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg("data") data: UpdateInput,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.userService.update(user.id, data)
  }

  // LOGOUT
  @Mutation(() => Boolean)
  async logout(): Promise<boolean> {
    return true
  }
}
