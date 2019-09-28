import {
  Resolver,
  Mutation,
  Arg,
  Authorized,
  Query,
  Ctx,
  FieldResolver,
  Root,
} from "type-graphql"

import { SharedElement } from "./sharedElement.entity"
import { SharedElementService } from "./sharedElement.service"

import { ResolverContext } from "../../lib/types"
import { UserService } from "../user/user.service"
import { CreateSharedElementsInput } from "./sharedElement.input"
import { User } from "../user/user.entity"
import { Element } from "../element/element.entity"

@Resolver(() => SharedElement)
export class SharedElementResolver {
  constructor(
    private readonly sharedElementService: SharedElementService,
    private readonly userService: UserService,
  ) {}

  // ALL SHARED ELEMENTS BY USER
  @Authorized()
  @Query(() => [SharedElement], { nullable: true })
  async allSharedElements(@Ctx() { userId }: ResolverContext): Promise<
    SharedElement[]
  > {
    return this.sharedElementService.findAll(userId)
  }

  // ALL SHARED USERS BY ELEMENT
  @Authorized()
  @Query(() => [User], { nullable: true })
  async allSharedUsers(@Arg("elementId") elementId: string): Promise<User[]> {
    return this.sharedElementService.findAllSharedUsersByElementId(elementId)
  }

  // ALL SHARED USERS BY USER
  @Authorized()
  @Query(() => [User], { nullable: true })
  async allSharedUsersByUser(@Arg("userId") userId: string): Promise<User[]> {
    return this.sharedElementService.findAllSharedUsersByUserId(userId)
  }

  // CREATE SHARED ELEMENTS
  @Authorized()
  @Mutation(() => [SharedElement], { nullable: true })
  async createSharedElements(@Arg("data")
  {
    emails,
    elementId,
  }: CreateSharedElementsInput): Promise<SharedElement[]> {
    const sharedElements = emails.map(async email => {
      const user = await this.userService.findByEmail(email)
      if (!user) throw new Error("User" + email + " doesn't exist")
      return this.sharedElementService.create({
        userId: user.id,
        elementId,
      })
    })
    return Promise.all(sharedElements)
  }

  // // UPDATE SHARED ELEMENT
  // @Authorized()
  // @Mutation(() => SharedElement, { nullable: true })
  // async updateSharedElement(
  //   @Arg("elementId") elementId: string,
  //   @Arg("data") data: CreateSharedElementInput,
  // ): Promise<SharedElement> {
  //   return this.sharedElementService.update(elementId, data)
  // }

  // DESTROY SHARED ELEMENT
  @Authorized()
  @Mutation(() => Boolean, { nullable: true })
  async destroySharedElement(
    @Arg("email") email: string,
    @Arg("elementId") elementId: string,
  ): Promise<boolean> {
    const user = await this.userService.findByEmail(email)
    return this.sharedElementService.destroy(user.id, elementId)
  }

  // TODO: Data loader
  @FieldResolver()
  user(@Root() sharedElement: SharedElement) {
    return User.findOneOrFail(sharedElement.userId)
  }

  @FieldResolver()
  element(@Root() sharedElement: SharedElement) {
    return Element.findOneOrFail(sharedElement.elementId)
  }
}
