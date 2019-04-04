import { Resolver, Mutation, Arg, Authorized, Query } from "type-graphql"

import { Element } from "./element.entity"
import { ElementService } from "./element.service"
// import { ResolverContext } from "../../lib/types"
import { CreateElementInput } from "./element.input"

@Resolver(() => Element)
export class ElementResolver {
  constructor(private readonly elementService: ElementService) {}

  // ALL ELEMENTS
  @Authorized()
  @Query(() => [Element], { nullable: true })
  allElements(): Promise<Element[]> {
    return this.elementService.findAll()
  }

  // CREATE ELEMENT
  @Authorized()
  @Mutation(() => Element, { nullable: true })
  async createElement(@Arg("data") data: CreateElementInput): Promise<Element> {
    return this.elementService.create(data)
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
}
