import { InputType, Field } from "type-graphql"
import { SharedElement } from "./sharedElement.entity"

@InputType()
export class CreateSharedElementInput implements Partial<SharedElement> {
  @Field()
  userId: string

  @Field()
  elementId: string
}

@InputType()
export class CreateSharedElementsInput {
  @Field(() => [String])
  emails: string[]

  @Field(() => String)
  elementId: string
}
