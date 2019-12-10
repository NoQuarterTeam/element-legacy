import {
  Resolver,
  Mutation,
  Arg,
  Authorized,
  Query,
  FieldResolver,
  Root,
} from "type-graphql"

import { Element } from "./element.entity"
import { ElementService } from "./element.service"
// import { ResolverContext } from "../../lib/types"
import { CreateElementInput } from "./element.input"
import { CurrentUser } from "../shared/context/currentUser"
import { User } from "../user/user.entity"
import { Loaders } from "../shared/context/loaders"

@Resolver(() => Element)
export class ElementResolver {
  constructor(private readonly elementService: ElementService) {}

  // ALL ELEMENTS
  @Authorized()
  @Query(() => [Element], { nullable: true })
  async allElements(
    @CurrentUser() user: User,
    @Arg("selectedUserId") selectedUserId: string,
  ): Promise<Element[]> {
    return this.elementService.findAll(user.id, selectedUserId)
  }

  // CREATE ELEMENT
  @Authorized()
  @Mutation(() => Element, { nullable: true })
  async createElement(
    @Arg("data") data: CreateElementInput,
    @CurrentUser() user: User,
  ): Promise<Element> {
    return this.elementService.create(data, user.id)
  }

  // UPDATE ELEMENT
  @Authorized()
  @Mutation(() => Element, { nullable: true })
  async updateElement(
    @Arg("elementId") elementId: string,
    @Arg("data") data: CreateElementInput,
  ): Promise<Element> {
    return this.elementService.update(elementId, data)
  }

  // DESTROY ELEMENT
  @Authorized()
  @Mutation(() => Boolean, { nullable: true })
  destroyElement(@Arg("elementId") elementId: string): Promise<boolean> {
    return this.elementService.destroy(elementId)
  }

  @FieldResolver()
  async children(
    @Root() element: Element,
    @Loaders() { elementChildrenLoader }: Loaders,
  ) {
    return elementChildrenLoader.load(element.id)
  }
}
