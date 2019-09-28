import { InputType, Field } from "type-graphql"
import { SharedElement } from "./sharedElement.entity"

@InputType()
export class CreateSharedElementInput implements Partial<SharedElement> {
  @Field({ nullable: true })
  userId?: string

  @Field({ nullable: true })
  creatorId?: string

  @Field({ nullable: true })
  elementId?: string
}

@InputType()
export class CreateSharedElementsInput {
  @Field(() => [String])
  emails: string[]

  @Field(() => String)
  elementId: string
}
